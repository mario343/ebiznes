package com.example

import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

object ProductRepository {
    fun getAll(): List<Product> = transaction {
        Products.selectAll().map {
            Product(it[Products.id].value, it[Products.name], it[Products.price])
        }
    }

    fun getById(id: Int): Product? = transaction {
        Products.select { Products.id eq id }.mapNotNull {
            Product(it[Products.id].value, it[Products.name], it[Products.price])
        }.singleOrNull()
    }

    fun add(product: Product): Product = transaction {
        val insertedId = Products.insertAndGetId {
            it[name] = product.name
            it[price] = product.price
        }
        product.copy(id = insertedId.value)
    }
}
