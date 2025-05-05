package com.example

import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.server.plugins.contentnegotiation.ContentNegotiation
import io.ktor.server.plugins.cors.routing.CORS
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import io.ktor.server.routing.routing
import kotlinx.serialization.json.Json

fun main() {
    DatabaseFactory.init()
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

fun Application.module() {
    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
    }

    install(ContentNegotiation) {
        json(
            Json {
                prettyPrint = true
                isLenient = true
            },
        )
    }

    routing {
        route("/products") {
            get {
                call.respond(ProductRepository.getAll())
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                val product = id?.let { ProductRepository.getById(it) }
                if (product != null) {
                    call.respond(product)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Product not found")
                }
            }

            post {
                val product = call.receive<Product>()
                val savedProduct = ProductRepository.add(product)
                call.respond(HttpStatusCode.Created, savedProduct)
            }
        }

        post("/payment") {
            val payment = call.receive<Payment>()
            println("Payment received: $payment")
            call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
        }
    }
}
