package main

import (
	"github.com/gin-gonic/gin"
	"golangTriviaGame/src/routes"
)

func main() {
	r := gin.Default()

	routes.RouteInit(r.Group("/api"))

	r.Run("192.168.18.174:8080")
}
