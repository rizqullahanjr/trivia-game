package routes

import (
	"fmt"
	"golangTriviaGame/src/controllers"
	"golangTriviaGame/src/dto"

	"github.com/gin-gonic/gin"
)

type topupRoutes struct {
	topup_controller controllers.ITopupController
}

func NewTopupRoutes(gin *gin.Engine, topup_controller controllers.ITopupController){
	handler := topupRoutes{topup_controller: topup_controller}
	group := gin.Group("/api/v1")
	group.GET("/topup", handler.FindDataTopup)
	group.POST("/topup", handler.TopupDiamond)
	// group.POST("/verify-transaction", handler.VerifyTransaction)
}


func (r topupRoutes) FindDataTopup(c *gin.Context) {
	data ,err:= r.topup_controller.FindDataTopup()

	if err != nil {
		c.JSON(500, gin.H{
			"message" : fmt.Sprintf("Error : %v", err),
		})
	}

	c.JSON(200, gin.H{
		"message" : "Succesfully get data topup",
		"data" : data,
	})
}

func (r topupRoutes) TopupDiamond(c *gin.Context) {
	var reqBody  dto.TopupRequest
	err := c.ShouldBindJSON(&reqBody)
	if err != nil {
		c.JSON(500, gin.H{
			"message" : fmt.Sprintf("Error : %v", err),
		})
	}
	
	data, err := r.topup_controller.TopupDiamond(reqBody)
	c.JSON(200, gin.H{
		"message" : data,
	})

}