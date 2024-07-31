package controllers

import (
	"net/http"
	"notification-service/initializers"
	"notification-service/models"

	"notification-service/services"

	"github.com/gin-gonic/gin"
)

func SendVerificationEmail(c *gin.Context) {
	var verificationEmailBody struct {
		UserId          string
		UserEmail       string
		verificationURL string
	}

	err := c.BindJSON(&verificationEmailBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	services.SendVerificationEmail()
	verificationEmailData := models.EmailNotification{UserId: verificationEmailBody.UserId, NotificationType: models.VerificationEmail}
	result := initializers.DB.Create(&verificationEmailData)

	if result.Error != nil {
		c.Status(500)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Email sent to the user",
	})
}
