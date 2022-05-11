package store

import (
	"github.com/gin-gonic/gin"
)

func AddItems(c *gin.Context) {
	owner := c.GetString("id") // This gets the identifier out of the http Request

	// Magic here TBD, get items out of request
	toAdd := []*PantryItem{}

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
		newAccount := &PantryList{
			OwnerID: owner,
			Items:   toAdd,
		}
		allData = append(allData, newAccount) // TODO replace with database implementation
	}
}
