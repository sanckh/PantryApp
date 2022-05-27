package store

import (
	"github.com/gin-gonic/gin"
)

func UpdateGrocery(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	grocery := GetGroceryForAccount(acc)
	pantry := GetPantryForAccount(acc)
	// TODO implement logic
	if interface{}(grocery) == pantry {
		// this is just to compile
	}
}
