package com.example

import kotlinx.serialization.Serializable

@Serializable
data class Payment(
    val products: List<Product>,
    val sum: Double,
)
