package models

import (
	"time"
)

type Avatar struct {
	Id          int           `gorm:"primarykey;autoIncrement" json:"id"`
	Cost        int           `gorm:"type:int" json:"cost"`
	Image       string        `gorm:"type:varchar(255)" json:"image"`
	UserAvatars []User_Avatar `gorm:"foreignKey:Avatar_id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"Avatar_id"`
	CreatedAt   time.Time     `json:"created_at"`
	UpdatedAt   time.Time     `json:"updated_at"`
}

type Avatars []Avatar

func (a Avatars) Len() int           { return len(a) }
func (a Avatars) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a Avatars) Less(i, j int) bool { return a[i].Cost > a[j].Cost }

type AvatarResponse struct {
	Id       int    `json:"id"`
	Cost     int    `json:"cost"`
	Image    string `json:"image"`
	AvatarID int    `json:"Avatar_id"`
}

func (AvatarResponse) TableName() string {
	return "avatars"
}
