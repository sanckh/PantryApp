package engine

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/store"
)

func handleRoutes(e *gin.Engine, logger *log.Logger) {

	storeRoutes := e.Group("/pantry")
	// Handle the various routes desired
	storeRoutes.Handle("GET", "/list", store.ListItems)
	storeRoutes.Handle("POST", "/add", store.AddItems)

	// Not handled
	e.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })
}
