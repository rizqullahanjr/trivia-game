package main

import (
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/database"

	"golangTriviaGame/src/repository"
	"golangTriviaGame/src/routes"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

func main() {

	dbConnection := database.Database()

	// responseStatus := midtranspayment.VerifyTransaction("ueIlsl7yjn")
	// if responseStatus == "settlement" {
	// 	fmt.Println("Berhasil TOP UP")
	// }else if responseStatus == "pending"{
	// 	fmt.Println("PENDING TOP UP")
	// }else{
	// 	fmt.Println("GAGAL TOP UP")
	// }

	//repository

	avatarRepository := repository.NewAvatarRepository(dbConection)
	avatarUserRepository := repository.AvatarRepo(dbConection)
	topupRepository := repository.NewTopupRepository(dbConection)
	diamondRepository := repository.NewDiamondRepository(dbConection)
	diamondPlayerRepository := repository.DiamondPlayerRepository(dbConection)
	



	//controller
	avatarController := controllers.NewAvatarController(avatarRepository, avatarUserRepository)

	topupController := controllers.NewTopupController(topupRepository)
	diamondController := controllers.NewDiamondController(diamondRepository)
	diamondPlayerController := controllers.NewDiamondPlayerController(diamondPlayerRepository, topupRepository)


	//router
	g := gin.Default()
	g.Use(cors.Default())
	routes.NewAvatarUserRoutes(g, avatarController)

	routes.NewTopupRoutes(g, topupController)
	routes.NewDiamondRoutes(g, diamondController)
	routes.NewDiamondPlayerRoutes(g, diamondPlayerController)


	routes.RouteInit(g.Group("/api/v1"))

	g.Run("192.168.18.174:5000")

}
