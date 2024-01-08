package routes

import (
	"golangTriviaGame/src/controllers"

	"github.com/gin-gonic/gin"
)

func AvatarRoute(r *gin.RouterGroup) {
	controller := controllers.AvatarController{}

	r.GET("/avatar", controller.FindAllAvatar)
}