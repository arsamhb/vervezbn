package main

import (
	"net/http"
	"notification-service/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run()
}

// RUN COMMAND
// CompileDaemon -command="./notification-service"

// MIGRATION COMMAND
// go run migrate/migrate.go
