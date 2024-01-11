package controllers

import (
	// "golangTriviaGame/src/database"
	// "golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
	"strconv"

	"github.com/gin-gonic/gin"
)

// SAvatarController import repository
type SAvatarController struct {
	IAvatarRepo repository.IAvatarRepo
}

// AvatarController import interface
func AvatarController(IAvatarRepo repository.IAvatarRepo) *SAvatarController {
	return &SAvatarController{IAvatarRepo}
}

func (con *SAvatarController) FindAllAvatar(c *gin.Context) {
	avatars, err := con.IAvatarRepo.FindAllAvatar()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "failed get avatar",
		})
	}

	c.JSON(200, gin.H{
		"message": "successfully get avatar",
		"data":    avatars,
	})
}

func (con *SAvatarController) FindPayAvatar(c *gin.Context) {
	avatars, err := con.IAvatarRepo.FindPayAvatar()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "failed get avatar",
		})
	}

	c.JSON(200, gin.H{
		"message": "successfully get avatar",
		"data":    avatars,
	})
}

func (con *SAvatarController) FindFreeAvatar(c *gin.Context) {
	avatars, err := con.IAvatarRepo.FindFreeAvatar()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "failed get avatar",
		})
	}

	c.JSON(200, gin.H{
		"message": "successfully get avatar",
		"data":    avatars,
	})
}

func (con *SAvatarController) FindOneAvatar(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	avatarID, err := con.IAvatarRepo.FindOneAvatar(id)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "failed get avatar",
		})
	}
	c.JSON(200, gin.H{
		"message": "successfully get avatar",
		"data":    avatarID,
	})

}

// type AvatarController struct {}

// func (con AvatarController) FindAllAvatar(c *gin.Context) {
//    var avatars models.Avatars
// 	database.DB.Find(&avatars)
// 	c.JSON(200, gin.H{
// 		"message" : "successfully get avatar",
// 		"data" : avatars,
// 	})
// }
