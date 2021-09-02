package server

type Name struct {
	First string `json:"First"`
	Last  string `json:"Last"`
}

type User struct {
	Name     Name   `json:"Name"`
	Email    string `json:"Email"`
	School   string `json:"School"`
	Username string `json:"Username"`
	Password string `json:"Password"`
	Id       int    `json:"Id"`
}
