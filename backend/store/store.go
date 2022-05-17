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
	allData  []*model.PantryList
	allUsers []*model.User
)

// This is very basic and unchecked, will need to be adjusted later
func HandleError(c *gin.Context, err error) {
	b, _ := json.Marshal(err.Error())
	c.Writer.Write(b)
}

func InitMockData() {
	allData = []*model.PantryList{}
	allUsers = []*model.User{}
}

// Change the actual implementation of these to use the database
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
	for _, pList := range allData {
		if pList.AccountID == acc {
			return pList
		}
	}
	return nil
}

func AddPantryForAccount(pantry *model.PantryList) {
	allData = append(allData, pantry)
}

func UpdatePantry(pantry *model.PantryList) {
	// Implement - Update database with new values
	// Not relevant for local data
}

func RemoveItem(acc string, toRemove *model.PantryItem) {
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
	UpdatePantry(pantry)
}

////////////////////
