package com.example

import org.jetbrains.exposed.dao.id.IntIdTable

object Products : IntIdTable() {
    val name = varchar("name", 255)
    val price = double("price")
}