package routes

import (
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/database"
	"golangTriviaGame/src/repository"

	"github.com/gin-gonic/gin"
)

func AvatarRoute(e *gin.RouterGroup) {
	r := repository.AvatarRepo(database.DB)
	con := controllers.AvatarController(r)

	e.GET("/avatar", con.FindAllAvatar)

}