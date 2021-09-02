package server

import(
	// automatically handles all of the bloating code need for db integration like unique ids, date of creation, etc.
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model	

	Name string 
	Email string `gorm:"typevarchar(100);unique_index"` // `...` tells gorm to define emails as totally unique strings with max 100 characters 
	TotalHomework []Homework
}

type Deadline struct {
	Month int `json:"Month"`
	Day   int `json:"Day"`
	Year  int `json:"Year"`
}

type Homework struct {
	gorm.Model

	Course      string   `json:"Course"`
	Link        string   `json:"Link"`
	Deadline    Deadline `json:"Deadline"`
	Description string   `json:"Description"` `gorm:unique_index`
	UserID int
}