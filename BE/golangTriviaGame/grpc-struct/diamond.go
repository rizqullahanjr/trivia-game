package grpc_struct

import (
	"context"
	pb "golangTriviaGame/diamond"
	"golangTriviaGame/src/services"
)

type Diamond struct {
	pb.DiamondServer
}

func (s *Diamond) Add(ctx context.Context, req *pb.UserDiamond) (*pb.Result, error) {
	service := services.PlayerService{}
	id := req.GetId()
	diamond := req.GetDiamond()

	service.AddDiamond(int(id), int(diamond))

	return &pb.Result{
		Message: "success",
	}, nil
}
