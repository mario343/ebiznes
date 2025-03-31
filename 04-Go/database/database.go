package database

import (
	"log"
	"zadanie4/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
    var err error
    DB, err = gorm.Open(sqlite.Open("zadanie4.db"), &gorm.Config{})
    if err != nil {
        log.Fatal("Couldn't connect to the database:", err)
    }

    err = DB.AutoMigrate(&models.Product{}, &models.Category{}, &models.Manufacturer{}, &models.Client{}, &models.Order{})

    if err != nil {
        log.Fatal("Migration failed:", err)
    }

    log.Println("Database and tables created successfully!")
}
