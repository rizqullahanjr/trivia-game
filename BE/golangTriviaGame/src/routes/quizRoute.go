package routes

import (
	"github.com/gin-gonic/gin"
	"golangTriviaGame/src/controllers"
)

func QuizRoute(r *gin.RouterGroup) {
	controller := controllers.QuizController{}

	r.GET("/get-question", controller.GetQuestion)
}
