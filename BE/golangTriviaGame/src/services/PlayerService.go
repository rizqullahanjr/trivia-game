package services

import (
	"golangTriviaGame/src/database"
	"golangTriviaGame/src/models"
	"gorm.io/gorm"
)

type PlayerService struct{}

func (PlayerService) AddDiamond(id int, diamond int) {
	db := database.Database()

	var player models.Players
	db.Model(&player).Where("id = ?", id).
		Update("diamond", gorm.Expr("diamond + ?", diamond))
}
