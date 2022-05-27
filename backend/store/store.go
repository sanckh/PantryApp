package store

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
)

const (
	IdVar      = "accountID"
	SigningKey = "beefcakes"
)

var (
	allPantryData  []*model.PantryList
	allGroceryData []*model.GroceryList
	allUsers       []*model.User
)

// This is very basic and unchecked, will need to be adjusted later
func HandleError(c *gin.Context, err error) {
	b, _ := json.Marshal(err.Error())
	c.Writer.Write(b)
}

func InitMockData() {
	allPantryData = []*model.PantryList{}
	allGroceryData = []*model.GroceryList{}
	allUsers = []*model.User{}
}

// Change the actual implementation of these to use the database
// This entire section is designed to be refactored and once the database is functional
////////////////////
func AddUser(user *model.User) {
	allUsers = append(allUsers, user)
}

func GetUserFromEmail(email string) *model.User {
	user := &model.User{}
	for _, u := range allUsers {
		if u.Email == email {
			user = u
		}
	}
	return user
}

func GetPantryForAccount(acc string) *model.PantryList {
	for _, pList := range allPantryData {
		if pList.AccountID == acc {
			return pList
		}
	}
	return nil
}

func AddPantryForAccount(pantry *model.PantryList) {
	allPantryData = append(allPantryData, pantry)
}

func UpdatePantryData(pantry *model.PantryList) {
	// Implement - Update database with new values
	// Not relevant for local data
}

func RemovePantryItem(acc string, toRemove *model.PantryItem) {
	// Get account pantry list
	pantry := GetPantryForAccount(acc)
	// Match item to remove
	index := -1
	items := pantry.Items
	for i, item := range items {
		if item.Name == toRemove.Name && item.Expiration == toRemove.Expiration {
			index = i
		}
	}
	// Reduce quantity
	if toRemove.Quantity != 0 {
		items[index].Quantity -= toRemove.Quantity
	} else {
		// If not provided, assume 1
		items[index].Quantity--
	}
	if items[index].Quantity <= 0 {
		// Remove item efficiently if none remain
		items[index] = items[len(items)-1]
		pantry.Items = items[:len(items)-1]
	}
	// Update database
	UpdatePantryData(pantry)
}

func GetGroceryForAccount(acc string) *model.GroceryList {
	for _, gList := range allGroceryData {
		if gList.AccountID == acc {
			return gList
		}
	}
	return nil
}

func AddGroceryForAccount(grocery *model.GroceryList) {
	allGroceryData = append(allGroceryData, grocery)
}

func UpdateGroceryData(pantry *model.GroceryList) {
	// Implement - Update database with new values
	// Not relevant for local data
}

func RemoveGroceryItem(acc string, toRemove *model.GroceryItem) {
	// Get account pantry list
	grocery := GetGroceryForAccount(acc)
	// Match item to remove
	index := -1
	items := grocery.Items
	for i, item := range items {
		if item.Name == toRemove.Name {
			index = i
		}
	}
	// Reduce quantity
	if toRemove.Quantity != 0 {
		items[index].Quantity -= toRemove.Quantity
	} else {
		// If not provided, assume 1
		items[index].Quantity--
	}
	if items[index].Quantity <= 0 {
		// Remove item efficiently if none remain
		items[index] = items[len(items)-1]
		grocery.Items = items[:len(items)-1]
	}
	// Update database
	UpdateGroceryData(grocery)
}

////////////////////
