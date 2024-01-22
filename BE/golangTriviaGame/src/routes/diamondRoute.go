package routes

import (
	"fmt"
	"golangTriviaGame/src/controllers"

	"github.com/gin-gonic/gin"
)

type diamondRoutes struct {
	diamondController controllers.IDiamondController
}

func NewDiamondRoutes(gin *gin.Engine, diamondController controllers.IDiamondController){
	handler := diamondRoutes{diamondController: diamondController}
	group := gin.Group("/api/v1")
	group.GET("/diamond", handler.FindDataDiamond)
}

func (r *diamondRoutes) FindDataDiamond(c *gin.Context) {
	dataDiamond ,err:= r.diamondController.FindDataDiamond()
	if err!= nil{
		c.JSON(500, gin.H{
			"message": fmt.Sprintf("Error : %v",err),
		})
	}
	c.JSON(200, gin.H{
		"message": "Succesfully get data diamond",
		"data": dataDiamond,
	})
}