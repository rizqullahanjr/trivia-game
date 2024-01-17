package repository

import (
	"fmt"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type ITopupRepository interface {
	FindDataTopup() ([]models.Topup, error)
	TopupDiamond(req models.Topup) (models.Topup, error)
}


type topupRepository struct {
	db *gorm.DB
}

func NewTopupRepository(db *gorm.DB) ITopupRepository {
	return &topupRepository{
		db: db,
	}
}

func (r *topupRepository)FindDataTopup()([]models.Topup, error){
	var topup []models.Topup
	err := r.db.Find(&topup).Error
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println(topup)
	return topup, err
}

func (r *topupRepository) TopupDiamond(req models.Topup) (models.Topup, error) {
	
	err := r.db.Create(&models.Topup{
		TotalDiamond: req.TotalDiamond,
		Email:        req.Email,
		Name:         req.Name,
		Price:        req.Price,
	})
	if err != nil {
		fmt.Println(err)
	}
	return req, nil
}