package store

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
)

func RemoveItems(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	// Get items from request body
	toRemove := []*model.PantryItem{}
	if err := c.BindJSON(&toRemove); err != nil {
		fmt.Println(err.Error())
		return
	}

	for _, item := range toRemove {
		RemoveItem(acc, item)
	}
}
