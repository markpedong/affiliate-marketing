package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddToCart(ctx *gin.Context) {
	var ids struct {
		ProductID string `json:"product_id" validate:"required"`
		UserID    string `json:"user_id" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "Invalid JSON input",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	if err := Validate.Struct(ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": false,
		"status":  http.StatusOK,
		"message": "added to cart successfully!",
	})
}
func RemoveItem(ctx *gin.Context)   {}
func CartCheckout(ctx *gin.Context) {}
func InstantBuy(ctx *gin.Context)   {}
