package models

import "time"

type Diamond struct {
	ID           uint      `gorm:"primarykey;autoIncrement" json:"id"`
	Price        int       `gorm:"type:int;not null" json:"price"`
	TotalDiamond int       `gorm:"type:int;not null" json:"total_diamond"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

