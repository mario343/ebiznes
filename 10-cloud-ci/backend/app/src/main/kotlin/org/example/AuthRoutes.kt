import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import com.example.JWTConfig
import com.example.UserRepository
import io.ktor.http.*

fun Route.authRoutes() {
    route("/auth") {
        post("/register") {
            val credentials = call.receive<Credentials>()
            val success = UserRepository.register(credentials.username, credentials.password)
            if (success) {
                call.respond(mapOf("message" to "Zarejestrowano pomyślnie"))
            } else {
                call.respond(mapOf("error" to "Użytkownik już istnieje"))
            }
        }

        post("/login") {
            val credentials = call.receive<Credentials>()
            val user = UserRepository.getUser(credentials.username)
            
            if (user == null) {
                call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Invalid username or password"))
                return@post
            }
            
            if (!UserRepository.verifyPassword(credentials.password, user.passwordHash)) {
                call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Invalid username or password"))
                return@post
            }
            
            val token = JWTConfig.generateToken(credentials.username)
            call.respond(mapOf("token" to token))
        }
    }
}

@Serializable
data class Credentials(val username: String, val password: String)
