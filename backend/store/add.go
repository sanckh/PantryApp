package store

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
)

func AddItems(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	// Get item from request body
	toAdd := []*model.PantryItem{}
	if err := c.BindJSON(&toAdd); err != nil {
		fmt.Println(err.Error())
		return
	}

	// This is mocked to use local data in place of a DB
	added := false
	for _, pList := range allData {
		if pList.AccountID == acc {
			pList.Items = append(pList.Items, toAdd...)
			added = true
		}
	}
	// If no owner account exists, add one
	if !added {
		newAccount := &model.PantryList{
			AccountID: acc,
			Items:     toAdd,
		}
		allData = append(allData, newAccount) // TODO replace with database implementation
	}
}
