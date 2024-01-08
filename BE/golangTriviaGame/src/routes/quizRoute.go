package routes

import (
	"golangTriviaGame/src/controllers"

	"github.com/gin-gonic/gin"
)

func QuizRoute(r *gin.RouterGroup) {
	controller := controllers.QuizController{}

	r.GET("/quiz", controller.FindAll)
}
