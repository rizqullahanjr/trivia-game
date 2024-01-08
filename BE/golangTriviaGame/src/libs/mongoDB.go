package libs

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

func ConnectMongoDB() *mongo.Client {
	client, err := mongo.NewClient(options.Client().ApplyURI(Env("MONGODB_URI")))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 100*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	// defer client.Disconnect(ctx)
	return client
}
