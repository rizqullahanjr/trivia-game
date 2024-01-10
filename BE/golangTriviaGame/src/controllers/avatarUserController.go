package controllers

import (
	"golangTriviaGame/src/models"
	"golangTriviaGame/src/repository"
)

type AvatarControllerUser interface{
	FindAllAvatarUser() ([]models.User_Avatar, error)
	FindAvatarId(player_id int) (models.User_Avatar, error)
}

type avatarControllerUser struct {
	avatarRepository repository.AvatarRepository
}

func NewAvatarController(avatarRepository repository.AvatarRepository) AvatarControllerUser {
	return &avatarControllerUser{avatarRepository : avatarRepository}
}

func (c *avatarControllerUser) FindAllAvatarUser() ([]models.User_Avatar, error){
	userAvatar, err := c.avatarRepository.FindAllAvatarUser()
	if err != nil{
		return nil, err
	}

	return userAvatar, nil
}

func (c *avatarControllerUser) FindAvatarId(player_id int) (models.User_Avatar, error){
	userAvatar, err := c.avatarRepository.FindAvatarId(player_id)
	if err != nil{
		return models.User_Avatar{}, err
	}
	return userAvatar, nil
}
// func (con *SAvatarUserController) FindAllAvatarUser (c *gin.Context) {
// 	data, err:= con.IAvatarUser.FindAllAvatarUser() 
// 	if err != nil {
// 		c.JSON(500, gin.H{
// 			"message" : "failed get avatar user",
// 		})
// 	}

// 	c.JSON(200, gin.H{
// 		"message" : "succesfully get avatar user",
// 		"data" : data,
// 	})
// }