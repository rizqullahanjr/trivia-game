package routes

import (
	"golangTriviaGame/src/controllers"
	"strconv"

	"github.com/gin-gonic/gin"
)

type avatarUserRoutes struct {
	avatarController controllers.AvatarControllerUser
}

func NewAvatarUserRoutes(gin *gin.Engine, avatarController controllers.AvatarControllerUser) {
	handler := avatarUserRoutes{avatarController: avatarController}

	group  := gin.Group("/api/v1")
	group.GET("/avataruser", handler.RouteInit)
	group.GET("/avataruser/:player_id", handler.FindAllAvatarUser)

}

func (r *avatarUserRoutes) RouteInit(c *gin.Context) {
	avatarUserData, err  := r.avatarController.FindAllAvatarUser()
	if err != nil {
		c.JSON(500, gin.H{
			"message" : "failed get avatar user",
		})
	}

	
	c.JSON(200, gin.H{
		"message" : "succesfully get avatar user",
		"data" : avatarUserData,
	})
}

func (r *avatarUserRoutes) FindAllAvatarUser(ctx *gin.Context) {
	// avatarUserData, err  := r.avatarController.FindAvatarId(ctx.Param("player_id"))
	playerId := ctx.Param("player_id")
	playerIDInt, err := strconv.Atoi(playerId)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message" : "invalid player_id",
		})
		return
	}

	avatarUserData, err  := r.avatarController.FindAvatarId(playerIDInt)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message" : "failed get avatar user",
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message" : "succesfully get avatar user",
		"data" : avatarUserData,
	})
}


// func AvatarUserRoute(e *gin.RouterGroup){
// 	r := repository.AvatarUser(database.DB)
// 	con := controllers.AvatarUserController(r)

// 	e.GET("/avataruser", con.FindAllAvatarUser)
// }