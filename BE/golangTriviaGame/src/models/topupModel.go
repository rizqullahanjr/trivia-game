package models

import "time"

type Topup struct {
	ID           uint      `gorm:"primarykey;autoIncrement" json:"id"`
	IdUser       int       `gorm:"type:int" json:"id_user"`
	TotalDiamond int       `gorm:"type:int" json:"total_diamond"`
	Email        string    `gorm:"type:varchar(50)" json:"email"`
	Name         string    `gorm:"type:varchar(50)" json:"name"`
	Price        int64     `gorm:"type:int" json:"price"`
	OrderId      string    `gorm:"type:varchar(50)" json:"order_id"`
	// DiamondPlayerID      int       `gorm:"type:int" json:"diamond_player_id"`
	CreatedAt   time.Time     `json:"created_at"`
	UpdatedAt   time.Time     `json:"updated_at"`
}