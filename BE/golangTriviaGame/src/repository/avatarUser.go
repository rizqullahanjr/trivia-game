package repository

import (
	"fmt"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type AvatarRepository interface {
	FindAllAvatarUser() ([]models.User_Avatar, error)
	DeleteUserAvatar(id int) error
	FindAvatarId(Player_id int) (models.User_Avatar, error)
}

type avatarRepository struct {
	db *gorm.DB
}

func NewAvatarRepository(db *gorm.DB) AvatarRepository {
	return &avatarRepository{
		db: db,
	}
}

func (r *avatarRepository) FindAllAvatarUser() ([]models.User_Avatar, error) {
	var avatarUser []models.User_Avatar
    err := r.db.Find(&avatarUser).Error
	
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println(avatarUser)
	return avatarUser, err
}

func (r *avatarRepository) DeleteUserAvatar(id int) error {
	
	return nil
}

func (r *avatarRepository) FindAvatarId(player_id int) (models.User_Avatar, error) {
	var avatarUser models.User_Avatar
	err := r.db.Where("player_id = ?", player_id).First(&avatarUser).Error
	return avatarUser, err
}