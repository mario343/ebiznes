package controllers

import models.Product
import javax.inject._

import play.api.libs.json._
import play.api.mvc._

import scala.collection.mutable
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private val products = mutable.ListBuffer(
    Product(1, "Komputer", 1000.00, true),
    Product(2, "RTX5090", 9999.99, false),
    Product(3, "Monitor", 500.50, true)
  )

  def getAllProducts: Action[AnyContent] = Action {
    if (products.isEmpty) {
      Ok(Json.obj("message" -> s"The list is empty!"))
    } else {
      Ok(Json.toJson(products))
    }
  }


  def getProduct(id: Long): Action[AnyContent] = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> s"ID: $id not found"))
    }
  }

  def createProduct: Action[JsValue] = Action(parse.json) { request =>
    val validationResult = request.body.validate[Product]

    validationResult match {
      case JsSuccess(product, _) =>
        val newId = if (products.isEmpty) 1 else (products.map(_.id).max + 1)

        val newProduct = product.copy(id = newId)
        products += newProduct

        Created(
          Json.obj(
            "message" -> s"Product with ID $newId has been successfully created.",
            "product" -> Json.toJson(newProduct)
          )
        )

      case JsError(errors) =>
        println("JSON Validation Errors: " + errors)
        BadRequest(Json.obj("error" -> JsError.toJson(errors)))
    }
  }

  def updateProduct(id: Long): Action[JsValue] = Action(parse.json) { request =>
    val validationResult = request.body.validate[Product]

    validationResult match {
      case JsSuccess(updatedProduct, _) =>
        val index = products.indexWhere(_.id == id)

        if (index == -1) {
          NotFound(Json.obj("error" -> s"ID: $id not found"))
        } else {
          val updatedProductWithId = updatedProduct.copy(id = id)
          products.update(index, updatedProductWithId)

          Ok(
            Json.obj(
              "message" -> s"Product with ID $id has been successfully updated.",
              "updatedProduct" -> Json.toJson(updatedProductWithId)
            )
          )
        }

      case JsError(errors) =>
        BadRequest(Json.obj("error" -> JsError.toJson(errors)))
    }
  }

  def deleteProduct(id: Long): Action[AnyContent] = Action {
    products.indexWhere(_.id == id) match {
      case -1 => NotFound(Json.obj("error" -> s" ID: $id not found"))
      case index =>
        products.remove(index)
        Ok(Json.obj("message" -> s"Product with ID $id has been deleted"))
    }
  }
}
