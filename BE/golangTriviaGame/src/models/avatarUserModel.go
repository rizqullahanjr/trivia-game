package models

type User_Avatar struct {

	// Id       int       `gorm:"primarykey;autoIncrement" json:"id"`
	Player_id int `gorm:"primarykey;" json:"player_id"`
	Avatar_id int `gorm:"primarykey" json:"avatar_id"`
	// PlayerResponse []PlayerResponse `gorm:"foreignKey:PlayerID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"players"`
	// AvatarResponse []AvatarResponse `gorm:"foreignKey:AvatarID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"avatars"`
}