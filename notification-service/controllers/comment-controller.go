package controllers

import (
	"net/http"
	"notification-service/initializers"
	"notification-service/models"

	"notification-service/services"

	"github.com/gin-gonic/gin"
)

func SendWritingComment(c *gin.Context) {
	var writingCommentBody struct {
		UserId     string
		UserEmail  string
		CommentURL string
	}

	err := c.BindJSON(&writingCommentBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	services.SendWritingComment()
	writingCommentData := models.EmailNotification{UserId: writingCommentBody.UserId, NotificationType: models.WritingCommentEmail}
	result := initializers.DB.Create(&writingCommentData)

	if result.Error != nil {
		c.Status(500)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Email sent to the user",
	})
}
