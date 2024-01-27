package models

import (
	"time"
)

type User struct {
	ID             string    `json:"id" gorm:"primaryKey"`
	CreatedAt      time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt      time.Time `json:"updated_at" gorm:"autoCreateTime"`
	UserCart       []Product `json:"user_cart" gorm:"foreignKey:ProductID"`
	AddressDetails []Address `json:"address_details" gorm:"foreignKey:AddressID"`
	Orders         []Order   `json:"orders" gorm:"foreignKey:OrderID"`
	FirstName      string    `json:"first_name" validate:"max=10"`
	LastName       string    `json:"last_name" validate:"max=10"`
	Password       string    `json:"password" validate:"required,min=6"`
	Email          string    `json:"email" validate:"required"`
	Phone          string    `json:"phone"`
	Username       string    `json:"username"`
}

type Product struct {
	ProductID   string  `json:"id" gorm:"primaryKey;column:id"`
	ProductName *string `json:"product_name" validate:"required"`
	Price       int     `json:"price" validate:"required"`
	// Rating      *uint8    `json:"rating" validate:"required"`
	Image       *string `json:"image"`
	CreatedAt   int     `json:"created_at" gorm:"autoCreateTime"`
	Description string  `json:"description" validate:"required"`
	Material    string  `json:"material" validate:"required"`
	Gender      string  `json:"gender" validate:"required"`
}

type Address struct {
	AddressID string  `json:"id"  gorm:"primaryKey;column:id"`
	House     *string `json:"house"`
	Street    *string `json:"street"`
	City      *string `json:"city"`
	Pincode   *string `json:"pin_code"`
}

type Order struct {
	OrderID       string    `json:"id" gorm:"primaryKey;column:id"`
	OrderCart     []Product `json:"order_cart" gorm:"foreignKey:ProductID"`
	OrderedAt     time.Time `json:"ordered_at" gorm:"autoCreateTime"`
	Price         int       `json:"price"`
	Discount      *int      `json:"discount"`
	PaymentMethod Payment   `json:"payment_method" gorm:"foreignKey:ID"`
}

type Payment struct {
	ID      string `json:"id" gorm:"primaryKey"`
	Digital bool   `json:"digital"`
	COD     bool   `json:"cod"`
}

type Blogs struct {
	ID          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
	Image       string `json:"image" validate:"required"`
	Link        string `json:"link" validate:"required"`
	CreatedAt   int    `json:"created_at" gorm:"autoCreateTime"`
}

type Collections struct {
	ID          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
	Image       string `json:"image" validate:"required"`
	CreatedAt   int    `json:"created_at" gorm:"autoCreateTime"`
}
