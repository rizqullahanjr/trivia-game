package migration

import (
	"fmt"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

func DatabaseMigration(db *gorm.DB) {
	db.AutoMigrate(&models.User{}, &models.Players{}, &models.Avatar{}, &models.User_Avatar{},&models.Topup{}, &models.PlayerResponse{}, &models.AvatarResponse{}, &models.Diamond{},&models.DiamondPlayer{}) 

	fmt.Println("Database Migrated")
}
