package controllers

import (
	// "golangTriviaGame/src/database"
	// "golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"

	"github.com/gin-gonic/gin"
)


type SAvatarController struct {
	IAvatarRepo repository.IAvatarRepo
}

func AvatarController(IAvatarRepo repository.IAvatarRepo) *SAvatarController {
	return &SAvatarController{IAvatarRepo}
}

func (con *SAvatarController) FindAllAvatar (c *gin.Context) {
	avatars, err:= con.IAvatarRepo.FindAllAvatar()
	if err != nil {
		c.JSON(500, gin.H{
			"message" : "failed get avatar",
		})
	}

	c.JSON(200, gin.H{
		"message" : "successfully get avatar",
		"data" : avatars,
	})
}





// type AvatarController struct {}

// func (con AvatarController) FindAllAvatar(c *gin.Context) {
//    var avatars []models.Avatars
// 	database.DB.Find(&avatars)
// 	c.JSON(200, gin.H{
// 		"message" : "successfully get avatar",
// 		"data" : avatars,
// 	})
// }