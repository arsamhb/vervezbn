package main

import (
	"notification-service/controllers"
	"notification-service/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()
	r.POST("/writing-comment", controllers.SendWritingComment)
	r.Run()
}

// RUN COMMAND
// CompileDaemon -command="./notification-service"

// MIGRATION COMMAND
// go run migrate/migrate.go
