package models

import (
	"time"
)

type Avatars struct {
	Id        int       `gorm:"primarykey;autoIncrement" json:"id"`
	Cost int `gorm:"type:int" json:"cost"`
	Image string `gorm:"type:varchar(50)" json:"image"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}