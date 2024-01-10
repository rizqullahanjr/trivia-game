package repository

import (
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type IAvatarRepo interface {
	FindAllAvatar() ([]models.Avatars, error)
	FindPayAvatar() ([]models.Avatars, error)
	FindFreeAvatar() ([]models.Avatars, error)
}

//find in database
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

func (r *SAvatarRepo) FindPayAvatar() ([]models.Avatars, error){
	var avatars []models.Avatars
	err := r.db.Where("cost > ?", 0).Find(&avatars).Error
	return avatars, err
}

func (r *SAvatarRepo) FindFreeAvatar() ([]models.Avatars, error){
	var avatars []models.Avatars
	err := r.db.Not("cost > ?", 0).Find(&avatars).Error
	return avatars, err
}