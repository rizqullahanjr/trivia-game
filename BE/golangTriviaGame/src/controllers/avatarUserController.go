package controllers

import (
	"golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
)

type AvatarControllerUser interface {
	FindAllAvatarUser() ([]models.User_Avatar, error)
	FindAvatarId(playerId int) (models.Avatar, error)
	FindPayAvatar() (models.Avatars, error)
	FindUserUpdateAvatar(PlayerId int) models.Avatars
}

type avatarControllerUser struct {
	avatarRepository     repository.AvatarRepository
	avatarUserRepository repository.IAvatarRepo
}

func NewAvatarController(avatarRepository repository.AvatarRepository, avatarUserRepository repository.IAvatarRepo) AvatarControllerUser {
	return &avatarControllerUser{avatarRepository: avatarRepository, avatarUserRepository: avatarUserRepository}
}

func (c *avatarControllerUser) FindAllAvatarUser() ([]models.User_Avatar, error) {
	userAvatar, err := c.avatarRepository.FindAllAvatarUser()
	if err != nil {
		return nil, err
	}

	return userAvatar, nil
}

func (c *avatarControllerUser) FindAvatarId(playerId int) (models.Avatar, error) {
	userAvatar, err := c.avatarRepository.FindAvatarId(playerId)
	dataAvatarByID, _ := c.avatarUserRepository.FindOneAvatar(userAvatar.Avatar_id)

	return dataAvatarByID, err
}

func (c *avatarControllerUser) FindPayAvatar() (models.Avatars, error) {
	paidAvatar, err := c.avatarRepository.FindPayAvatar()

	if err != nil {
		return nil, err
	}
	return paidAvatar, nil
}

func (c *avatarControllerUser) FindUserUpdateAvatar(PlayerId int) models.Avatars {
	// userAvatar, paidAvatar := c.avatarRepository.FindUserUpdateAvatar(Player_id)
	paidAvatar := c.avatarRepository.FindUserUpdateAvatar(PlayerId)

	// if err != nil{
	// 	return nil, err
	// }
	return paidAvatar
}
