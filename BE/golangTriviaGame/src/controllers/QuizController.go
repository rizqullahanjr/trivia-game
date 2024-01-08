package controllers

import "github.com/gin-gonic/gin"

type QuizController struct{}

func (QuizController) FindAll(c *gin.Context) {
	c.JSONP(200, gin.H{
		"message": "pong",
	})
}
