package controllers

import (
	"fmt"
	"golangTriviaGame/src/dto"
	midtranspayment "golangTriviaGame/src/midtrans"

	"golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
)

type ITopupController interface {
	FindDataTopup() ([]models.Topup, error)
	TopupDiamond(req dto.TopupRequest) (dto.TopupResponse, error)
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

func (c *topupController) TopupDiamond(req dto.TopupRequest) (dto.TopupResponse, error){

	var dataTopup = models.Topup{
		TotalDiamond: req.TotalDiamond,
		Email:        req.Email,
		Name:         req.Name,
		Price:        req.Price,
	}


	dataRes, err := c.topup_repository.TopupDiamond(dataTopup)
	if err != nil {
		return dto.TopupResponse{}, err
	}

	fmt.Println(">>>>>>>>>>>>>>>>>>>>>",req)
	datatopup := midtranspayment.RequiredData{
		TotalDiamond: req.TotalDiamond,
		Email:        req.Email,
		Name:         req.Name,
		Price:        req.Price,
	}

	snapURL := midtranspayment.SnapURL(datatopup)

	return dto.TopupResponse{
		TotalDiamond: dataRes.TotalDiamond,
		Email:        dataRes.Email,
		Name:         dataRes.Name,
		Price:        dataRes.Price,
		SnapURL:      snapURL,
	}, nil
}
	// return dto.TopupResponse{
	// 	TotalDiamond: req.TotalDiamond,
	// 	Email:        req.Email,
	// 	Name:         req.Name,
	// 	Price:        req.Price,
	// 	SnapURL:      snapURL,
	// }, nil

