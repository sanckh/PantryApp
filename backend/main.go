package main

import (
	"log"

	"github.com/sanckh/PantryApp/backend/engine"
)

const (
	tempAddr = "localhost" // TODO get actual address to run (hosting)
	tempPort = ":8080"
)

func main() {
	// Start logger
	logger := log.Default()
	logger.Println("Starting pantry server")

	// Obtain the server engine
	e := engine.NewEngine(logger)

	// Run the server
	err := e.Run(tempPort)
	if err != nil {
		panic(err)
	}
	logger.Println("Backend pantry server has stopped running.")
}
