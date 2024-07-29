package controllers

import (
	"net/http"
	"notification-service/initializers"
	"notification-service/models"

	"github.com/gin-gonic/gin"
)

func SendWritingComment(c *gin.Context) {
	var writingCommentBody struct {
		UserId     string
		UserEmail  string
		CommentURL string
		CueId      string
		Comment    string
	}

	err := c.BindJSON(&writingCommentBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	writingCommentData := models.WritingComment{UserId: writingCommentBody.UserId, CueId: writingCommentBody.CueId}
	result := initializers.DB.Create(&writingCommentData)

	if result.Error != nil {
		c.Status(500)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": " writingCommentBody",
	})
}
