package engine

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/store"
)

func handleRoutes(e *gin.Engine, logger *log.Logger) {

	// Auth routes
	e.Handle("POST", "/register", store.Register)
	e.Handle("POST", "/login", store.Login)

	// Pantry routes
	storeRoutes := e.Group("/pantry")
	storeRoutes.Handle("GET", "/list", store.Authenticate, store.ListItems)
	storeRoutes.Handle("POST", "/add", store.Authenticate, store.AddItems)

	// Not handled
	e.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })
}
