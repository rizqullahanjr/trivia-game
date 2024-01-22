package repository

import (
	"fmt"
	"golangTriviaGame/src/dto"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type IDiamondPlayerRepository interface {
	FindDataDiamond() ([]models.DiamondPlayer, error)
	CreateDiamondPlayer(req dto.DiamondPlayerRequest) error
	UpdateDiamondPlayer(req dto.PlayerRequest) (dto.PlayerResponse,error)
	UpdateData(req *models.Players) (dto.PlayerResponse,error)
}


type diamondPlayerRepository struct {
	db *gorm.DB
}


func DiamondPlayerRepository(db *gorm.DB) IDiamondPlayerRepository {
	return &diamondPlayerRepository{
		db: db,
	}
}

func (r *diamondPlayerRepository) FindDataDiamond() ([]models.DiamondPlayer, error) {
	var diamond []models.DiamondPlayer
	err := r.db.Find(&diamond).Error
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println(diamond)
	return diamond, err
}

func (r *diamondPlayerRepository) CreateDiamondPlayer(req dto.DiamondPlayerRequest) (error) {
	err := r.db.Create(&models.DiamondPlayer{
		// UserId:  req.UserId,
		IdOrder: req.IdOrder,
		Diamond: req.Diamond,
	}).Error
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (r *diamondPlayerRepository) UpdateDiamondPlayer(req dto.PlayerRequest)(dto.PlayerResponse,error){
	var data models.Players
	err := r.db.Model(&models.Players{}).Where("id", uint(req.ID)).First(&data).Error
	if err != nil {
		return dto.PlayerResponse{
			Diamond: data.Diamond,
		}, err
	}

	data.Diamond = req.Diamond
	 
	// models.DiamondPlayer.Diamond = models.DiamondPlayer

	err = r.db.Model(data.Diamond).Where("id", uint(req.ID)).Updates(map[string]interface{}{"diamond": data.Diamond}).Error
	if err != nil {
		return dto.PlayerResponse{}, err
	}
	return dto.PlayerResponse{
		Diamond: data.Diamond,
	}, nil
}

func (r *diamondPlayerRepository) UpdateData(req *models.Players)(dto.PlayerResponse,error){
	 existingDiamondData := models.Players{}
	fmt.Println("existingDiamondDataaaaaaaaaaaaaaaaaaaa>>>", existingDiamondData)
	
	err := r.db.Where("id = ?", uint(req.ID)).First(&existingDiamondData).Error
	if err != nil {
		return dto.PlayerResponse{}, err
	}
	fmt.Println("startingexistingDiamondData>>>",existingDiamondData)
	existingDiamondData.Diamond += req.Diamond
	fmt.Println("update>>>>>",existingDiamondData.Diamond)
	 
	// models.DiamondPlayer.Diamond = models.DiamondPlayer

	err = r.db.Model(&existingDiamondData).Where("id = ?",req.ID).Updates(map[string]interface{}{"diamond": existingDiamondData.Diamond}).Error
	// err = r.db.Model(&req).Where("id = ?", uint(req.ID)).Updates("diamond", existingDiamondData.Diamond).Error
	if err != nil {
		return dto.PlayerResponse{}, err
	}
	return dto.PlayerResponse{
		Diamond: existingDiamondData.Diamond,
	}, nil
}
