package model

// The ID for the User struct links to the OwnerID of the PantryList struct
// Multiple users can be linked to a single pantry

type User struct {
	Id       string `json:"user_id"`
	Name     string `json:"user_name"`
	Email    string `json:"user_email"`
	Password []byte `json:"-"`
}

type PantryList struct {
	AccountID string `json:"pantry_id"`
	Items     []*PantryItem
}

type PantryItem struct {
	Name       string `json:"item_name"`
	Expiration string `json:"item_expiration"`
	Quantity   uint   `json:"item_quantity"`
}
