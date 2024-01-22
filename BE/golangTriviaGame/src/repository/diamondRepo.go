package repository

import (
	"fmt"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type IDiamondRepository interface {
	FindAllDiamond() ([]models.Diamond, error)
}

type diamondRepository struct {
	db *gorm.DB
}

func NewDiamondRepository(db *gorm.DB) IDiamondRepository {
	return &diamondRepository{
		db: db,
	}
}

func (r *diamondRepository) FindAllDiamond() ([]models.Diamond, error){
	var diamond []models.Diamond
	err := r.db.Find(&diamond).Error
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println(diamond)
	return diamond, err
}
