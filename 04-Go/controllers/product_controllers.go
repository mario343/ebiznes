package controllers

import (
	"zadanie4/database"
	"zadanie4/models"
	"net/http"
	"github.com/labstack/echo/v4"
)


func GetProducts(c echo.Context) error {
	var products []models.Product

	database.DB.Preload("Category").Find(&products)

	if len(products) == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "products not found"})
	}

	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product
	
	if err := database.DB.Preload("Category").First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "product not found"})
	}
	return c.JSON(http.StatusOK, product)

}

func CreateProduct(c echo.Context) error {
	var product models.Product

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	database.DB.Create(&product)
	return c.JSON(http.StatusCreated, product)

}

func UpdateProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "product not found"})
	}

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	database.DB.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "product not found"})
	}

	database.DB.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}