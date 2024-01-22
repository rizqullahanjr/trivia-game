package models

import "time"

type Players struct {
	ID           uint      `gorm:"primarykey;autoIncrement" json:"id"`
	Name         string    `gorm:"type:varchar(50)" json:"name"`
	Avatar       string    `gorm:"type:varchar(50)" json:"avatar"`
	Diamond      int       `gorm:"type:int" json:"diamond"`
	// DiamondPlayers int `gorm:"type:int;default:0" json:"diamond_players"`
	PlayerAvatars []User_Avatar `gorm:"foreignKey:Player_id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"Player_id"`
	Topups []Topup `gorm:"foreignKey:IdUser;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"IdUser"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}


type PlayerResponse struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Avatar      string `json:"avatar"`
	Diamond     int    `json:"diamond"`
	// HighestPoint int    `json:"highest_point"`
	// TotalPoint  int    `json:"total_point"`
	PlayerID    int    `json:"player_id"`
}


func (PlayerResponse) TableName() string {
	return "players"
}