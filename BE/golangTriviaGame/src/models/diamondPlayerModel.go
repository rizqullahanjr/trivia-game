package models

type DiamondPlayer struct {
	ID      uint   `gorm:"primarykey;autoIncrement" json:"id"`
	IdOrder string `gorm:"type:varchar(50);unique" json:"id_order"`
	Diamond int    `gorm:"type:int" json:"diamond"`
	// DataDiamond Players `gorm:"foreignKey:diamond_players;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"data_diamond"`
	// Topup   []Topup `gorm:"foreignKey:DiamondPlayerID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"topup"`
}