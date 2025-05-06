import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import com.example.JWTConfig
import io.ktor.server.plugins.cors.routing.*
import io.ktor.http.*


fun main() {
    embeddedServer(Netty, port = 8080) {
        install(ContentNegotiation) {
            json()
        }

        install(CORS) {
            allowMethod(HttpMethod.Get)
            allowMethod(HttpMethod.Post)
            allowMethod(HttpMethod.Put)
            allowMethod(HttpMethod.Delete)
            allowHeader(HttpHeaders.ContentType)
            allowHeader(HttpHeaders.Authorization)
            allowCredentials = true
            allowHost("localhost:3000", schemes = listOf("http"))
        }

        install(Authentication) {
            jwt("auth-jwt") {
                realm = "ktor sample app"
                verifier(JWTConfig.verifier)
                validate {
                    JWTConfig.validate(it)
                }
            }
        }

        routing {
            authRoutes()

            authenticate("auth-jwt") {
                get("/profile") {
                    call.respondText("Dostęp chroniony - jesteś zalogowany!")
                }
            }
        }
    }.start(wait = true)
}
