package store

import (
	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
)

func AddItems(c *gin.Context) {
	owner := c.GetHeader(IdVar) // This gets the identifier out of the http request

	// Magic here TBD, get items out of request
	// TODO: Actually make this sensible
	item := c.GetHeader("item")
	toAdd := []*model.PantryItem{
		{
			Name:       item,
			Expiration: "Eventually",
		},
	}

	// This is mocked to use local data in place of a DB
	added := false
	for _, pList := range allData {
		if pList.OwnerID == owner {
			pList.Items = append(pList.Items, toAdd...)
			added = true
		}
	}
	// If no owner account exists, add one
	if !added {
		newAccount := &model.PantryList{
			OwnerID: owner,
			Items:   toAdd,
		}
		allData = append(allData, newAccount) // TODO replace with database implementation
	}
}
