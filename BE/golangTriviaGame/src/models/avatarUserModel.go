package models

import (
	"time"
)

type AvatarUser struct {
	Id        int       `gorm:"primarykey;autoIncrement" json:"id"`
	IdPlayer int       `gorm:"type:int" json:"id_player"`
	IdAvatar int       `gorm:"type:int" json:"id_avatar"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}