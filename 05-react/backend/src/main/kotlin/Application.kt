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
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import io.ktor.serialization.kotlinx.json.*

fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

fun Application.module() {

    install(CORS) {
        anyHost() // w produkcji wiadomo ze powinno byc to deczko lepiej zrobione
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
        get("/products") {
            call.respond(
                listOf(
                    Product(1, "Laptop", 3000.0),
                    Product(2, "Mouse", 100.0),
                    Product(3, "Screen", 800.0),
                    Product(4, "Keyboard", 100.0),
                    Product(5, "Accessory", 50.0),

                )
            )
        }

        post("/payment") {
            val payment = call.receive<Payment>()
            println("Payment received: $payment")
            call.respond(HttpStatusCode.OK, mapOf("status" to "OK"))
        }
    }
}

@Serializable
data class Product(val id: Int, val name: String, val price: Double)

@Serializable
data class Payment(val products: List<Product>, val sum: Double)

