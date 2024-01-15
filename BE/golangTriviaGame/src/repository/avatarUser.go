package repository

import (
	"fmt"
	"golangTriviaGame/src/models"
	"gorm.io/gorm"
)

type AvatarRepository interface {
	FindAllAvatarUser() ([]models.User_Avatar, error)

	FindAvatarId(PlayerId int) (models.User_Avatar, error) //find by id
	FindPayAvatar() (models.Avatars, error)                // find paid avatar
	// FindUserUpdateAvatar FindUserUpdateAvatar(Player_id int) (models.Avatar, models.Avatars) //find user update avatar
	FindUserUpdateAvatar(PlayerId int) models.Avatars //find user update avatar
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

//func (r *avatarRepository) DeleteUserAvatar(id int) error {
//
//	return nil
//}

func (r *avatarRepository) FindAvatarId(PlayerId int) (models.User_Avatar, error) {
	var avatarUser models.User_Avatar
	err := r.db.Where("player_id = ?", PlayerId).First(&avatarUser).Error
	if err != nil {
		fmt.Println(err)
		return models.User_Avatar{}, err
	}
	return avatarUser, err
}

func (r *avatarRepository) FindPayAvatar() (models.Avatars, error) {
	var avatars models.Avatars
	err := r.db.Where("cost > ?", 0).Find(&avatars).Error
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return avatars, err
}

func (r *avatarRepository) FindUserUpdateAvatar(PlayerId int) models.Avatars {
	//get avatarUser
	var avatarUser models.User_Avatar
	err := r.db.Where("player_id = ?", PlayerId).First(&avatarUser).Error
	if err != nil {
		fmt.Println(err)
	}

	// avatarId := avatarUser.Avatar_id
	var avatarId models.User_Avatar
	//get avatar
	var avatarID models.Avatar
	err = r.db.Where("avatar_id = ?", avatarId).First(&avatarID).Error
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("avatarID: %+v\n", avatarID)

	var paidAvatars models.Avatars
	fmt.Println(paidAvatars)
	err = r.db.Where("cost > ?", 0).Find(&paidAvatars).Error
	if err != nil {
		fmt.Println(err)
	}
	return paidAvatars
}
