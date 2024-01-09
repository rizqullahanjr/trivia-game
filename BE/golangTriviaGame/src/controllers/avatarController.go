package controllers

import (
	"golangTriviaGame/src/database"
	"golangTriviaGame/src/models"

	"github.com/gin-gonic/gin"
)


type AvatarController struct {}

func (con AvatarController) FindAllAvatar(c *gin.Context) {
   var avatars []models.Avatars
	database.DB.Find(&avatars)
	c.JSON(200, gin.H{
		"message" : "successfully get avatar",
		"data" : avatars,
	})
}