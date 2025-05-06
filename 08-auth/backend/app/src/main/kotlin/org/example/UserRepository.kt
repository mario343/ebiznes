package com.example 


object UserRepository {
    private val users = mutableListOf<User>()

    fun getUser(username: String): User? {
        return users.find { it.username == username }
    }

    fun verifyPassword(password: String, hash: String): Boolean {
        return try {
            org.mindrot.jbcrypt.BCrypt.checkpw(password, hash)
        } catch (e: Exception) {
            false
        }
    }

    fun register(username: String, password: String): Boolean {
        if (users.any { it.username == username }) return false
        val hashed = org.mindrot.jbcrypt.BCrypt.hashpw(password, org.mindrot.jbcrypt.BCrypt.gensalt())
        users.add(User(username, hashed))
        return true
    }
}