package controllers

import (
	// "golangTriviaGame/src/database"
	// "golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"

	"github.com/gin-gonic/gin"
)

//import repository
type SAvatarController struct {
	IAvatarRepo repository.IAvatarRepo
}

//import interface
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


func (con *SAvatarController) FindPayAvatar (c *gin.Context) {
	avatarspaid, err:= con.IAvatarRepo.FindPayAvatar()
	if err != nil {
		c.JSON(500, gin.H{
			"message" : "failed get avatar",
		})
	}

	c.JSON(200, gin.H{
		"message" : "successfully get avatar",
		"data" : avatarspaid,
	})
}

func (con *SAvatarController) FindFreeAvatar (c *gin.Context) {
	avatarsfree, err :=con.IAvatarRepo.FindFreeAvatar()
	if err != nil {
		c.JSON(500, gin.H{
			"message" : "failed get avatar",
		})
	}

	c.JSON(200, gin.H{
		"message" : "successfully get avatar",
		"data" : avatarsfree,
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