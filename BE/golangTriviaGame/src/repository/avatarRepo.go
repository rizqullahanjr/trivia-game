package repository

import (
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type IAvatarRepo interface {
	FindAllAvatar() ([]models.Avatars, error)
}

type SAvatarRepo struct {
	db *gorm.DB
}

func AvatarRepo(db *gorm.DB) *SAvatarRepo {
	return &SAvatarRepo{db}
}

func (r *SAvatarRepo) FindAllAvatar() ([]models.Avatars, error) {
	var avatars []models.Avatars
	err := r.db.Find(&avatars).Error
	return avatars, err
}