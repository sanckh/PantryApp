package store

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
)

const (
	IdVar = "accountID"
)

var (
	allData []*PantryList
)

type PantryList struct {
	OwnerID string
	Items   []*PantryItem
}

type PantryItem struct {
	Name       string
	Expiration string
}

func InitMockData() {
	allData = []*PantryList{}
}

// This is very basic and unchecked, will need to be adjusted later
func HandleError(c *gin.Context, err error) {
	b, _ := json.Marshal(err.Error())
	c.Writer.Write(b)
}
