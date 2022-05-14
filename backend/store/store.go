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
