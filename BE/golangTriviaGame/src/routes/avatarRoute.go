package routes

import (
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/database"
	"golangTriviaGame/src/repository"

	"github.com/gin-gonic/gin"
)

func AvatarRoute(e *gin.RouterGroup) {
	var dbCon = database.Database()
	r := repository.AvatarRepo(dbCon)
	con := controllers.AvatarController(r)

	e.GET("/avatar", con.FindAllAvatar)
	e.GET("/avatar-pay", con.FindPayAvatar)
	e.GET("/avatar-free", con.FindFreeAvatar)
	e.GET("/avatar/:id", con.FindOneAvatar)
	e.GET("/avatar-user-update/:id", con.FindUpdateAvatar)

}
