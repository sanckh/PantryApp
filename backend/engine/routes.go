package engine

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/store"
)

func handleRoutes(e *gin.Engine, logger *log.Logger) {
	// Handle the various routes desired
	e.Handle("GET", "/list", store.ListItems)
	e.Handle("POST", "/add", store.AddItems)
}
