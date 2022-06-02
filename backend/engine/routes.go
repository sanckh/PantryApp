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
	pantryRoutes := e.Group("/pantry")
	pantryRoutes.Handle("GET", "/list", store.Authenticate, store.ListPantryItems)
	pantryRoutes.Handle("POST", "/add", store.Authenticate, store.AddPantryItems)
	pantryRoutes.Handle("POST", "/remove", store.Authenticate, store.RemovePantryItems)

	// Grocery routes
	groceryRoutes := e.Group("/grocery")
	groceryRoutes.Handle("GET", "/list", store.Authenticate, store.ListGroceryItems)
	groceryRoutes.Handle("POST", "/add", store.Authenticate, store.AddGroceryItems)
	groceryRoutes.Handle("POST", "/remove", store.Authenticate, store.RemoveGroceryItems)
	groceryRoutes.Handle("POST", "/update", store.Authenticate, store.UpdateGrocery)

	// Not handled
	e.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })
}
