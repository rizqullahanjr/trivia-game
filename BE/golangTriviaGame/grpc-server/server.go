package main

import (
	pb "golangTriviaGame/diamond"
	grpc_struct "golangTriviaGame/grpc-struct"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {

	listener, err := net.Listen("tcp", "192.168.18.174:50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	srv := grpc.NewServer()
	pb.RegisterDiamondServer(srv, &grpc_struct.Diamond{})

	log.Println("Server is running on 192.168.18.174:50051")
	if err := srv.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
