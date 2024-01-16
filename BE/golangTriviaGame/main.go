package main

import (
	"fmt"
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/database"
	midtransPayment "golangTriviaGame/src/midtrans"
	"golangTriviaGame/src/repository"
	"golangTriviaGame/src/routes"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

func main() {

	dbConection := database.Database()

	snapurl := midtransPayment.SnapURL()
	fmt.Printf("Snap URLlllllllllllllllllll: %+v", snapurl)

	//repository
	avatarRepository := repository.NewAvatarRepository(dbConection)
	avatarUserRepository := repository.AvatarRepo(dbConection)

	//controller
	avatarController := controllers.NewAvatarController(avatarRepository, avatarUserRepository)

	//roter
	g := gin.Default()
	g.Use(cors.Default())
	routes.NewAvatarUserRoutes(g, avatarController)

	routes.RouteInit(g.Group("/api/v1"))

	// g.Run("192.168.18.174:5000")
	g.Run(":5000")

}
