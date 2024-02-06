package controllers

import (
	"net/http"
	"solitude/cloudinary"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

func AddProducts(ctx *gin.Context) {
	var body models.Product

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := Validate.Struct(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	product := &models.Product{
		ProductID:   uuid.Must(uuid.NewRandom()).String(),
		SellerID:    body.SellerID,
		ProductName: body.ProductName,
		Price:       body.Price,
		Image:       pq.StringArray(body.Image),
		Description: body.Description,
		Stock:       body.Stock,
		Rating:      body.Rating,
		Category:    pq.StringArray(body.Category),
	}

	if err := database.DB.Create(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	for i := range body.Variants {
		variant := &models.ProductVariations{
			ID:        uuid.Must(uuid.NewRandom()).String(),
			ProductID: product.ProductID,
			Label:     body.Variants[i].Label,
			Value:     body.Variants[i].Value,
		}

		if err := database.DB.Create(variant).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		product.Variants = append(product.Variants, *variant)
	}

	helpers.JSONResponse(ctx, "successfully added product", helpers.DataHelper(product))
}

func GetAllProductsByID(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var existingSeller models.Seller
	if err := database.DB.Preload("Products").Where("seller_id = ?", body.SellerID).First(&existingSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingSeller.Products))
}

func GetAllProducts(ctx *gin.Context) {
	var body struct {
		Material string `json:"material"`
		Price    int    `json:"price"`
		Gender   string `json:"gender"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var query = database.DB.Order("created_at DESC")
	if body.Material != "" {
		query = query.Where("material = ?", body.Material)
	}
	if body.Price > 0 {
		query = query.Where("price <= ?", body.Price)
	}
	if body.Gender != "" {
		validGenders := map[string]bool{"male": true, "female": true, "others": true}

		if _, found := validGenders[body.Gender]; found {
			query = query.Where("gender = ?", body.Gender)
		} else {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "Invalid Gender! Please check")
			return
		}
	}

	var products []models.Product
	if err := query.
		Find(&products).
		Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	for i := range products {
		var variations []models.ProductVariations
		if err := database.DB.Where("product_id = ?", products[i].ProductID).Find(&variations).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		products[i].Variants = variations
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(products))
}

func GetProductsByID(ctx *gin.Context) {
	var body struct {
		ID string `json:"product_id"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var product models.Product
	if err := database.DB.Where("product_id = ?", body.ID).First(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var variations []models.ProductVariations
	if err := database.DB.Where("product_id = ?", body.ID).Find(&variations).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	product.Variants = variations

	helpers.JSONResponse(ctx, "successfully got the product details!", helpers.DataHelper(product))
}

func UploadImage(ctx *gin.Context) {
	form, err := ctx.FormFile("file")

	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	uploadResult, err := cloudinary.CloudinaryService.Upload.Upload(ctx, form, uploader.UploadParams{Folder: "products"})
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	imageRes := map[string]interface{}{
		"url":      uploadResult.URL,
		"fileName": uploadResult.OriginalFilename,
		"size":     uploadResult.Bytes,
	}

	helpers.JSONResponse(ctx, "upload successful!", helpers.DataHelper(imageRes))
}

func SearchProductByQuery(ctx *gin.Context) {
	var body struct {
		ProductID string `json:"product_id"`
	}
	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "check the JSON format!")
		return
	}

	var product models.Product
	if err := database.DB.First(&product, "product_id = ?", body.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "something went wrong when fetching data")
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(product))
}

func GetVariationsByID(ctx *gin.Context) {
	var body struct {
		ProductID string `json:"product_id" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid payload")
		return
	}

	if err := Validate.Struct(body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var existingCategories []models.ProductVariations
	if err := database.DB.Find(&existingCategories, "product_id = ?", body.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingCategories))

}
