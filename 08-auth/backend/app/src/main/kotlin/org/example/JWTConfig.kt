package com.example

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.interfaces.DecodedJWT
import io.ktor.server.auth.jwt.*
import java.util.*

object JWTConfig {
    private const val secret = "mysecret"
    private const val issuer = "ktor.io"
    private const val audience = "ktor_audience"
    private const val validityInMs = 36_000_00 * 10 // 10h

    private val algorithm = Algorithm.HMAC256(secret)

    val verifier: JWTVerifier = JWT
        .require(algorithm)
        .withIssuer(issuer)
        .withAudience(audience)
        .build()

    fun generateToken(username: String): String = JWT.create()
        .withSubject("Authentication")
        .withIssuer(issuer)
        .withAudience(audience)
        .withClaim("username", username)
        .withExpiresAt(Date(System.currentTimeMillis() + validityInMs)) 
        .sign(algorithm)

    fun validate(credential: JWTCredential): JWTPrincipal? {
        val username = credential.payload.getClaim("username").asString()
        val expiration = credential.payload.expiresAt

        if (username != null && expiration != null && expiration.after(Date())) {
            return JWTPrincipal(credential.payload)
        }

        return null 
    }
}
