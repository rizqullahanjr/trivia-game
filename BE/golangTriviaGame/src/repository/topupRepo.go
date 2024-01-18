package repository

import (
	"fmt"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type ITopupRepository interface {
	FindDataTopup() ([]models.Topup, error)
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