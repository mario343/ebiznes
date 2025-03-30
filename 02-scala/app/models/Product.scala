package models

import play.api.libs.json._

case class Product(id: Long, name: String, price: Double, onSale: Boolean)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}