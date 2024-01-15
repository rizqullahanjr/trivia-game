package migration

import (
	"fmt"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

func DatabaseMigration(db *gorm.DB) {
	db.AutoMigrate(&models.User{}, &models.Players{}, &models.Avatar{}, &models.User_Avatar{}, &models.PlayerResponse{}, &models.AvatarResponse{})

	fmt.Println("Database Migrated")
}
