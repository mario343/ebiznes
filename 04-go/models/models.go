package models

type Product struct {
	ID          uint      `gorm:"primaryKey"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	CategoryID  uint      `json:"category_id"`
	Category    Category  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Orders      []Order   `gorm:"many2many:order_products;"`
}

type Category struct {
	ID        uint      `gorm:"primaryKey"`
	Name      string    `json:"name"`
	Products  []Product `json:"products" gorm:"foreignKey:CategoryID"`
}

type Manufacturer struct {
	ID    uint   `gorm:"primaryKey"`
	Name  string `json:"name"`
}

type Client struct {
	ID     uint   `gorm:"primaryKey"`
	Name   string `json:"name"`
	Email  string `json:"email" gorm:"uniqueIndex"`
	Orders []Order `json:"orders"`
}

type Order struct {
	ID        uint           `gorm:"primaryKey"`
	ClientID  uint           `json:"client_id"`
	Client    Client         `gorm:"foreignKey:ClientID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Products  []Product      `gorm:"many2many:order_products;"`
}

type OrderProduct struct {
	OrderID   uint    `gorm:"primaryKey"`
	ProductID uint    `gorm:"primaryKey"`
	Quantity  int     `gorm:"default:1"`
	Price     float64 
}