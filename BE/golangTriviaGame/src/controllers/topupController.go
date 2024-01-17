package controllers

import (
	"fmt"
	"golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
)

type ITopupController interface {
	FindDataTopup() ([]models.Topup, error)
}

type topupController struct {
	topup_repository repository.ITopupRepository
}

func NewTopupController(topup_repository repository.ITopupRepository)ITopupController {
	return &topupController{
		topup_repository: topup_repository,
	}
}

func (c *topupController) FindDataTopup()([]models.Topup, error){
	dataTopup, err:= c.topup_repository.FindDataTopup()
	if err != nil {
		fmt.Printf("Error : %v", err)
	}
	return dataTopup, nil
}