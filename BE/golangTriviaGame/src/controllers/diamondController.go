package controllers

import (
	"fmt"
	"golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
)

type IDiamondController interface {
	FindDataDiamond() ([]models.Diamond, error)
	
}

type diamondController struct {
	diamondRepository repository.IDiamondRepository
}

func NewDiamondController(diamondRepository repository.IDiamondRepository) IDiamondController{
	return &diamondController{
		diamondRepository: diamondRepository,
	}
}

func (c *diamondController) FindDataDiamond() ([]models.Diamond, error){
	dataDiamond, err:=c.diamondRepository.FindAllDiamond()
	if err != nil {
		fmt.Printf("Error : %v", err)
	}
	return dataDiamond, nil

}