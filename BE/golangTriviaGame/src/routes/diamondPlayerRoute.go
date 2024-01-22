package routes

import (
	"fmt"
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/dto"

	"github.com/gin-gonic/gin"
)

type diamondPlayerRoutes struct {
	diamond_Player_controller controllers.IDiamondPlayerController
}

func NewDiamondPlayerRoutes(gin *gin.Engine, diamond_Player_controller controllers.IDiamondPlayerController) {
	handler := diamondPlayerRoutes{diamond_Player_controller: diamond_Player_controller}
	group := gin.Group("/api/v1")
	group.GET("/diamondplayer", handler.FindDataDiamondPlayer)
	// group.POST("/diamond-player", handler.CreateDiamondPlayer)
	group.POST("/verify-transaction", handler.VerifyTransaction)
	group.POST("/diamond-player", handler.UpdateData)
}

func (r *diamondPlayerRoutes) FindDataDiamondPlayer(c *gin.Context) {
	dataDiamond, err := r.diamond_Player_controller.FindDataDiamondPlayer()
	if err != nil {
		c.JSON(500, gin.H{
			"message": fmt.Sprintf("Error : %v", err),
		})
	}
	c.JSON(200, gin.H{
		"message": "Succesfully get data diamond",
		"data":    dataDiamond,
	})
}

func (r diamondPlayerRoutes) VerifyTransaction(c *gin.Context) {
	var reqBody map[string]interface{}

	err:= c.ShouldBindJSON(&reqBody)
	if err != nil {
		c.JSON(500, gin.H{
			"message" : fmt.Sprintf("Error : %v", err),
		})
	}
	var orderID = reqBody["order_id"].(string)

	var dataDTO = dto.ReqVerifyPayment{
		OrderId: orderID,
	}

	success, err  := r.diamond_Player_controller.UpdateDiamondPlayer(dataDTO)
	if err != nil {
		c.JSON(500, gin.H{
			"message" : fmt.Sprintf("Error : %v", err),
		})
	}

	// fmt.Println(orderID)

	// call function verifytransaction orderID as an argument
	// responseStatus := midtranspayment.VerifyTransaction(orderID) 

	c.JSON(200, gin.H{
		"message" : "succeed",
		"data" : success,
	})
	
}

func (r diamondPlayerRoutes) UpdateData(c *gin.Context) {
	
	var reqBody dto.PlayerRequest
	
	err := c.ShouldBindJSON(&reqBody)

	if err != nil {
		c.JSON(500, gin.H{
			"message" : fmt.Sprintf("Error : %v", err),
		})
	}
	dataUpdate, err := r.diamond_Player_controller.UpdateData(reqBody)
	
	c.JSON(200, gin.H{
		"message" : "Succesfully update data diamond",
		"data" : dataUpdate,
	})
}

