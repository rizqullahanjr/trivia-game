package controllers

import (
	"fmt"
	"golangTriviaGame/src/dto"
	midtranspayment "golangTriviaGame/src/midtrans"
	"golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
	"log"
)

type IDiamondPlayerController interface {
	FindDataDiamondPlayer() ([]models.DiamondPlayer, error)
	HandleAfterPayment(req dto.DiamondPlayerRequest) error
	UpdateDiamondPlayer(req dto.ReqVerifyPayment) (string, error)
	UpdateData(req dto.PlayerRequest) (dto.PlayerResponse,error)
}

type diamondPlayerController struct {
	diamond_player_repository repository.IDiamondPlayerRepository
	topup_repository repository.ITopupRepository

	
}

func NewDiamondPlayerController(diamond_player_repository repository.IDiamondPlayerRepository, topup_repository repository.ITopupRepository ) IDiamondPlayerController{
	return &diamondPlayerController{
		diamond_player_repository: diamond_player_repository,
		topup_repository: topup_repository,
	}
}

func ( c* diamondPlayerController) FindDataDiamondPlayer() ([]models.DiamondPlayer, error){
	data, err:= c.diamond_player_repository.FindDataDiamond()
	if err != nil {
		fmt.Println("errorrrrrrrrrrrrrrrrrr",err)
	}
	return data, nil
}


func (c *diamondPlayerController) HandleAfterPayment(req dto.DiamondPlayerRequest) error{
	var data = models.DiamondPlayer{
		// UserId:  req.UserId,
		IdOrder: req.IdOrder,
		Diamond: req.Diamond,
	}
	err := c.diamond_player_repository.CreateDiamondPlayer(dto.DiamondPlayerRequest{
		// UserId:  data.UserId,
		IdOrder: data.IdOrder,
		Diamond: data.Diamond,
	})
	if err != nil{
		fmt.Println(err)
		return err
	}
	return nil
}

func (c *diamondPlayerController) UpdateDiamondPlayer(req dto.ReqVerifyPayment) (string, error){
	dataTopUP, err := c.topup_repository.FindOneByOrderID(req.OrderId)
	if err != nil{
		log.Fatalln(err)
		return "", err
	}
	
	status := midtranspayment.VerifyTransaction(req.OrderId)
	if status == "settlement"{
		diamondPlayer := models.Players{
			ID: uint(dataTopUP.IdUser),
			Diamond: dataTopUP.TotalDiamond,
		}
		_, err := c.diamond_player_repository.UpdateData(&diamondPlayer)
		if err != nil {
			log.Println(err)
			return "", err
		}
		return "settlement", nil
	}else if status == "pending"{
		fmt.Println("status pending")
	}else{
		fmt.Println("status failed")
	}
	return "", nil
} 

func (c *diamondPlayerController) UpdateData(req dto.PlayerRequest) (dto.PlayerResponse, error){

	randomString,err := midtranspayment.GenerateRandomString(10)
	if err != nil{
		return dto.PlayerResponse{}, err
	}
	var data = models.Players{
		ID: uint(req.ID),
		Diamond: req.Diamond,
	}
	dataUpdate, err := c.diamond_player_repository.UpdateData(&data)
	if err != nil{
		log.Println(err)
		return dto.PlayerResponse{}, err
	}
	return dto.PlayerResponse{
		Diamond : dataUpdate.Diamond,
		ID: dataUpdate.ID,
		IdOrder: randomString,
	}, nil
}