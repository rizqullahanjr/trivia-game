package database

import (
	"fmt"
	"golangTriviaGame/src/database/migration"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Database() *gorm.DB{

	err:= godotenv.Load()
	if err != nil {
		panic(err)
	}

	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta",
	dbHost, dbUser, dbPass, dbName, dbPort) 
	DBPostgres, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	migration.DatabaseMigration(DBPostgres)
	
	fmt.Println("Connection Opened to Database")

	return DBPostgres
}