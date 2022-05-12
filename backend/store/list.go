package store

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
)

func ListItems(c *gin.Context) {
	owner := c.GetString("id") // This gets the identifier out of the http Request

	// This is mocked to use local data in place of a DB
	var data *PantryList
	for _, pList := range allData {
		if pList.OwnerID == owner {
			data = pList
			break
		}
	}
	// Format data as desired here
	b, err := json.Marshal(data)
	if err != nil {
		HandleError(c, err)
	}
	c.Writer.Write(b)
}
