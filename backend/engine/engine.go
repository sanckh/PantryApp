package engine

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/store"
)

func NewEngine(logger *log.Logger) *gin.Engine {
	// Start the server engine
	// e := gin.New()
	e := gin.Default()
	e.SetTrustedProxies(nil)

	// Initialize database
	store.InitMockData() // This is mocked to use local data currently

	// Handle the desired api routes
	handleRoutes(e, logger)
	return e
}
