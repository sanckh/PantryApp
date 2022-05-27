package store

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
)

func AddPantryItems(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	// Get items from request body
	toAdd := []*model.PantryItem{}
	if err := c.BindJSON(&toAdd); err != nil {
		fmt.Println(err.Error())
		return
	}

	pantry := GetPantryForAccount(acc)
	// If no owner account exists, add one
	if pantry == nil {
		newList := &model.PantryList{
			AccountID: acc,
			Items:     toAdd,
		}
		AddPantryForAccount(newList)
		return
	}
	// Add items to pantry list
	pantry.Items = append(pantry.Items, toAdd...)
	UpdatePantryData(pantry)
}

func AddGroceryItems(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	// Get items from request body
	toAdd := []*model.GroceryItem{}
	if err := c.BindJSON(&toAdd); err != nil {
		fmt.Println(err.Error())
		return
	}

	grocery := GetGroceryForAccount(acc)
	// If no owner account exists, add one
	if grocery == nil {
		newList := &model.GroceryList{
			AccountID: acc,
			Items:     toAdd,
		}
		AddGroceryForAccount(newList)
		return
	}
	// Add items to pantry list
	grocery.Items = append(grocery.Items, toAdd...)
	UpdateGroceryData(grocery)
}
