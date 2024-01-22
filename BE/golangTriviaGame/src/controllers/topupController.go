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
	HandleAfterPayment(req dto.TopupRequest) (dto.TopupResponse, error)
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

	var randomFIx string

	randomSTring, _ := midtranspayment.GenerateRandomString(10)

	randomFIx = randomSTring

	var dataTopup = models.Topup{
		IdUser:       req.IdUser,
		TotalDiamond: req.TotalDiamond,
		Email:        req.Email,
		Name:         req.Name,
		Price:        req.Price,
		OrderId:      randomFIx,
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
		RandomString: randomFIx,
	}

	snapURL := midtranspayment.SnapURL(datatopup)

	return dto.TopupResponse{
		IdUser:       dataRes.IdUser,
		TotalDiamond: dataRes.TotalDiamond,
		Email:        dataRes.Email,
		Name:         dataRes.Name,
		Price:        dataRes.Price,
		OrderId:      dataRes.OrderId,
		SnapURL:      snapURL,
	}, nil
}

func (c *topupController) HandleAfterPayment(req dto.TopupRequest) (dto.TopupResponse, error){
	
	
	
	
	return dto.TopupResponse{}, nil
}
	// return dto.TopupResponse{
	// 	TotalDiamond: req.TotalDiamond,
	// 	Email:        req.Email,
	// 	Name:         req.Name,
	// 	Price:        req.Price,
	// 	SnapURL:      snapURL,
	// }, nil

