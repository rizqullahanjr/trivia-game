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

	g.Run(":5000")
}
