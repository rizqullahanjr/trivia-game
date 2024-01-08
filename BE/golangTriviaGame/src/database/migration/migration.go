package migration

import (
	"fmt"
	"golangTriviaGame/src/database"
	"golangTriviaGame/src/models"
)

func DatabaseMigration() {
	database.DB.AutoMigrate(&models.User{}, &models.Players{}, &models.Avatars{}, &models.AvatarUser{})

	fmt.Println("Database Migrated")
}