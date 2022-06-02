package store

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
)

func ListPantryItems(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	pantry := GetPantryForAccount(acc)
	// Format data as desired here
	b, err := json.Marshal(pantry.Items)
	if err != nil {
		HandleError(c, err)
	}
	c.Writer.Write(b)
}

func ListGroceryItems(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	grocery := GetGroceryForAccount(acc)
	// Format data as desired here
	b, err := json.Marshal(grocery.Items)
	if err != nil {
		HandleError(c, err)
	}
	c.Writer.Write(b)
}
