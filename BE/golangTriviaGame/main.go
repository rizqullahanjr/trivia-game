package main

import (
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/database"
	"golangTriviaGame/src/repository"
	"golangTriviaGame/src/routes"

	"github.com/gin-gonic/gin"
)



func main() {
	
	dbConection := database.Database()

	//repository
	avatarUserRepository := repository.NewAvatarRepository(dbConection)
	
	

	//controller
	avatarController := controllers.NewAvatarController(avatarUserRepository)
	
	
	//roter
	g := gin.Default()
	routes.NewAvatarUserRoutes(g, avatarController)

	routes.RouteInit(g.Group("/api/v1"))


	g.Run(":5000")

