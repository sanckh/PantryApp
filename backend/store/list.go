package store

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
)

func ListItems(c *gin.Context) {
	acc := c.GetString(IdVar) // Auth supplies this value

	// This is mocked to use local data in place of a DB
	var data *model.PantryList
	for _, pList := range allData {
		if pList.AccountID == acc {
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
