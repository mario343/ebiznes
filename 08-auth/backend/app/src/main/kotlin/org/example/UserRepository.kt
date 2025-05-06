package com.example

import java.sql.Connection
import java.sql.DriverManager
import java.sql.PreparedStatement
import java.sql.ResultSet
import org.mindrot.jbcrypt.BCrypt

object UserRepository {
    private const val DB_URL = "jdbc:sqlite:users.db"
    
    init {
        val connection = DriverManager.getConnection(DB_URL)
        val stmt = connection.createStatement()
        stmt.execute("""
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                passwordHash TEXT NOT NULL
            )
        """)
        stmt.close()
        connection.close()
    }

    fun getUser(username: String): User? {
        val connection = DriverManager.getConnection(DB_URL)
        val stmt: PreparedStatement = connection.prepareStatement("SELECT * FROM users WHERE username = ?")
        stmt.setString(1, username)
        val rs: ResultSet = stmt.executeQuery()

        val user = if (rs.next()) {
            User(rs.getString("username"), rs.getString("passwordHash"))
        } else {
            null
        }

        stmt.close()
        connection.close()
        return user
    }

    fun verifyPassword(password: String, hash: String): Boolean {
        return try {
            BCrypt.checkpw(password, hash)
        } catch (e: Exception) {
            false
        }
    }

    fun register(username: String, password: String): Boolean {
        val connection = DriverManager.getConnection(DB_URL)

        val stmt: PreparedStatement = connection.prepareStatement("SELECT COUNT(*) FROM users WHERE username = ?")
        stmt.setString(1, username)
        val rs: ResultSet = stmt.executeQuery()
        if (rs.getInt(1) > 0) {
            stmt.close()
            connection.close()
            return false 
        }

        val hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt())
        val insertStmt: PreparedStatement = connection.prepareStatement("INSERT INTO users (username, passwordHash) VALUES (?, ?)")
        insertStmt.setString(1, username)
        insertStmt.setString(2, hashedPassword)
        insertStmt.executeUpdate()

        insertStmt.close()
        stmt.close()
        connection.close()
        return true
    }
}
