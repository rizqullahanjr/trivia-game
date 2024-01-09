package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Database() {
	dsn := "host=tiny.db.elephantsql.com user=ajcmfolt password=vakY4gXqiR6EQb1RQ4Fvs2fGJGE4KOFp dbname=ajcmfolt port=5432 sslmode=disable TimeZone=Asia/Jakarta"
	DBPostgres, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})


	if err != nil {
		panic(err)
	}
	DB = DBPostgres
	fmt.Println("Connection Opened to Database")
}