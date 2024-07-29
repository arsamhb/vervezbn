package main

import (
	"notification-service/initializers"
	"notification-service/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.WritingComment{})
}
