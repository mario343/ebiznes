package com.example

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseFactory {
    fun init() {
        Database.connect("jdbc:sqlite:data.db", driver = "org.sqlite.JDBC")
        transaction {
            SchemaUtils.create(Products)
            seedData()
        }
    }

    private fun seedData() {
        if (Products.selectAll().empty()) {
            println("Seeding initial product data...")
            val initialProducts =
                listOf(
                    "Laptop" to 3000.0,
                    "Mouse" to 100.0,
                    "Screen" to 800.0,
                    "Keyboard" to 100.0,
                    "Accessory" to 50.0,
                )

            initialProducts.forEach { (name, price) ->
                Products.insert {
                    it[Products.name] = name
                    it[Products.price] = price
                }
            }
        }
    }
}
