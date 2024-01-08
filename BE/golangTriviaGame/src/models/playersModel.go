package models

import "time"

type Players struct {
	ID           uint      `gorm:"primarykey;autoIncrement" json:"id"`
	Name         string    `gorm:"type:varchar(50)" json:"name"`
	Avatar       string    `gorm:"type:varchar(50)" json:"avatar"`
	Diamond      int       `gorm:"type:int" json:"diamond"`
	HighestPoint int       `gorm:"type:int" json:"highest_point"`
	TotalPoint   int       `gorm:"type:int" json:"total_point"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}