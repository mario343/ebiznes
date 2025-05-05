package com.example

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import io.ktor.serialization.kotlinx.json.*

fun main() {
    DatabaseFactory.init()
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

fun Application.module() {

    install(CORS) {
        anyHost() // Replace with specific host in production
        allowHeader(HttpHeaders.ContentType)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
    }

    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = true
        })
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
