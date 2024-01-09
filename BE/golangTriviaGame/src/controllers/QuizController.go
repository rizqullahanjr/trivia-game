package controllers

import (
	"github.com/gin-gonic/gin"
	"golangTriviaGame/src/services"

)

type QuizController struct{}

func (QuizController) GetQuestion(c *gin.Context) {
	service := services.QuizService{}

	quiz := service.GetQuestion()

	c.JSON(200, quiz)
}
