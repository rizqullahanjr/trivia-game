package main

import (
	"golangTriviaGame/src/database"
	"golangTriviaGame/src/routes"

	"github.com/gin-gonic/gin"
)



func main() {
	g := gin.Default()
	database.Database()

	// migration.DatabaseMigration()
	
	routes.RouteInit(g.Group("/api/v1"))


	r.Run("192.168.18.174:8080")
}
