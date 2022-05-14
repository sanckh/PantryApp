package model

type User struct {
	Id       string `json:"user_id"`
	Name     string `json:"user_name"`
	Email    string `json:"user_email" gorm:"unique"`
	Password []byte `json:"-"`
}

type PantryList struct {
	OwnerID string `json:"pantry_id" gorm:"unique"`
	Items   []*PantryItem
}

type PantryItem struct {
	Name       string `json:"item_name"`
	Expiration string `json:"item_expiration"`
	Quantity   uint   `json:"item_quantity"`
}
