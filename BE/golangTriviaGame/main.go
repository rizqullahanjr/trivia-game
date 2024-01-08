package main

import (
	"github.com/gin-gonic/gin"
	"golangTriviaGame/src/routes"
)

func main() {
	r := gin.Default()

	routes.RouteInit(r.Group("/api"))

	r.Run()
}
