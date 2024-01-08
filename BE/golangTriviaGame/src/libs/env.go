package libs

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func Env(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}
	return os.Getenv(key)
}
