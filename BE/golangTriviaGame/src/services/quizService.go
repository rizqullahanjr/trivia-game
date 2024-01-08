package services

import (
	"go.mongodb.org/mongo-driver/bson"
	"golangTriviaGame/src/libs"
	"golangTriviaGame/src/models"
	"log"
)

type QuizService struct{}

func (QuizService) GetQuestion() []models.Quiz {
	client, ctx := libs.ConnectMongoDB()
	defer client.Disconnect(ctx)

	coll := client.Database("trivia-game").Collection("quiz")

	pipeline := bson.A{
		bson.D{{"$sample", bson.D{{"size", 10}}}},
	}

	cursor, err := coll.Aggregate(ctx, pipeline)
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(ctx)

	var quiz []models.Quiz

	if err := cursor.All(ctx, &quiz); err != nil {
		log.Fatal(err)
	}

	return quiz
}
