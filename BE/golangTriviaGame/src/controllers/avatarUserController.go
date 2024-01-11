package controllers

import (
	"golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
)

type AvatarControllerUser interface{
	FindAllAvatarUser() ([]models.User_Avatar, error)
	FindAvatarId(player_id int) (map[string]any, error)
	FindPayAvatar() ([]models.Avatars, error)
	FindUserUpdateAvatar(Player_id int) ([]models.Avatars)

}

type avatarControllerUser struct {
	avatarRepository repository.AvatarRepository
	avatarUserRepository repository.IAvatarRepo
}

func NewAvatarController(avatarRepository repository.AvatarRepository, avatarUserRepository repository.IAvatarRepo) AvatarControllerUser {
	return &avatarControllerUser{avatarRepository : avatarRepository, avatarUserRepository : avatarUserRepository}
}

func (c *avatarControllerUser) FindAllAvatarUser() ([]models.User_Avatar, error){
	userAvatar, err := c.avatarRepository.FindAllAvatarUser()
	if err != nil{
		return nil, err
	}

	return userAvatar, nil
}

func (c *avatarControllerUser) FindAvatarId(player_id int) (map[string]any, error){
	userAvatar, err := c.avatarRepository.FindAvatarId(player_id)
	dataAvatarByID, _ := c.avatarUserRepository.FindOneAvatar(userAvatar.Avatar_id)

	newData := map[string]any{
		"id": userAvatar.Avatar_id,
		"avatar": dataAvatarByID.Image,
		"cost": dataAvatarByID.Cost,
		"player_id": userAvatar.Player_id,
	}
	
	if err != nil{
		return nil, err
	}


	return newData, nil
}


func (c *avatarControllerUser) FindPayAvatar() ([]models.Avatars, error){
	paidAvatar, err := c.avatarRepository.FindPayAvatar()
	
	if err != nil{
		return nil, err
	}
	return paidAvatar, nil
}


func (c *avatarControllerUser) FindUserUpdateAvatar(Player_id int) ([]models.Avatars){
	// userAvatar, paidAvatar := c.avatarRepository.FindUserUpdateAvatar(Player_id)
	 paidAvatar := c.avatarRepository.FindUserUpdateAvatar(Player_id)
	
	// if err != nil{
	// 	return nil, err
	// }
	return  paidAvatar
}