package routes

import (
	"fmt"
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/models"
	"sort"
	"strconv"

	"github.com/gin-gonic/gin"
)

type avatarUserRoutes struct {
	avatarController controllers.AvatarControllerUser
}

func NewAvatarUserRoutes(gin *gin.Engine, avatarController controllers.AvatarControllerUser) {
	handler := avatarUserRoutes{avatarController: avatarController}

	group := gin.Group("/api/v1")
	group.GET("/avatar-user", handler.FindAll)
	group.GET("/avatar-user/:player_id", handler.FindOneId)
	group.GET("/avatar-user-update/:player_id", handler.FindUserUpdateAvatar)

}

func (r *avatarUserRoutes) FindAll(c *gin.Context) {
	avatarUserData, err := r.avatarController.FindAllAvatarUser()
	if err != nil {
		c.JSON(500, gin.H{
			"message": "failed get avatar user",
		})
	}

	c.JSON(200, gin.H{
		"message": "successfully get avatar user",
		"data":    avatarUserData,
	})
}

func (r *avatarUserRoutes) FindOneId(ctx *gin.Context) {
	// avatarUserData, err  := r.avatarController.FindAvatarId(ctx.Param("player_id"))

	playerId := ctx.Param("player_id")
	playerIDInt, err := strconv.Atoi(playerId)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "invalid player_id",
		})
		return
	}

	avatarUserData, err := r.avatarController.FindAvatarId(playerIDInt)
	// paidAvatarData, _ := r.avatarController.FindPayAvatar()
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "failed get avatar user",
		})
		return
	}

	var dataRes []any
	paidAvatarData, _ := r.avatarController.FindPayAvatar()

	dataRes = append(dataRes, avatarUserData, paidAvatarData)
	// paidAvatarData = append(paidAvatarData, avatarUserData)
	ctx.JSON(200, gin.H{
		"message": "successfully get avatar user",
		"data":    dataRes,
	})

	// result["data"].(gin.H)["paidAvatarData"] = paidAvatarData

	// ctx.JSON(200, result)

}

func (r *avatarUserRoutes) FindPayAvatar(ctx *gin.Context) {
	avatarUserData, err := r.avatarController.FindPayAvatar()
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "failed get avatar user",
		})
	}

	ctx.JSON(200, gin.H{
		"message": "successfully get avatar user",
		"data":    avatarUserData,
	})
}

type CombinedData struct {
	UserData    map[string]any `json:"user_data"`
	PaidAvatars models.Avatars `json:"paid_avatars"`
}

func (r *avatarUserRoutes) FindUserUpdateAvatar(ctx *gin.Context) {

	playerId := ctx.Param("player_id")
	playerIDInt, err := strconv.Atoi(playerId)
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": "invalid player_id",
		})
		return
	}
	// avatarUserData, paidAvatar  := r.avatarController.FindAvatarId(playerIDInt)
	data, _ := r.avatarController.FindAvatarId(playerIDInt)
	paidAvatar, _ := r.avatarController.FindPayAvatar()

	fmt.Printf("%v =============== %v", data, paidAvatar)

	paidAvatar = append(paidAvatar, data)

	// if err != nil {
	// 	ctx.JSON(500, gin.H{
	// 		"message" : "failed get avatar user",
	// 	})
	// 	return
	// }

	// ctx.JSON (200, gin.H{
	// 	"message" : "successfully get avatar user",
	// 	"data" : data ,
	// 	"paidAvatar" : paidAvatar,
	// })
	sort.Sort(paidAvatar)

	ctx.JSON(200, paidAvatar)
}

// func AvatarUserRoute(e *gin.RouterGroup){
// 	r := repository.AvatarUser(database.DB)
// 	con := controllers.AvatarUserController(r)

// 	e.GET("/avatar-user", con.FindAllAvatarUser)
// }
