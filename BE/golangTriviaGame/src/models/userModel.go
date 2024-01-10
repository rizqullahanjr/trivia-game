package models

import "time"

type User struct {
	ID           uint      `gorm:"primarykey;autoIncrement" json:"id"`
	Name         string    `gorm:"type:varchar(50)" json:"name"`
	Email        string    `gorm:"type:varchar(50)" json:"email"`
	Password     string    `gorm:"type:varchar(50)" json:"password"`
	ProviderName string    `gorm:"type:varchar(50)" json:"provider_name"`
	TokenJson    string    ` gorm:"type:text" json:"token_json"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

