package server

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Deadline struct {
	Year  int `json:"Year"`
	Month int `json:"Month"`
	Day   int `json:"Day"`
}

type Homework struct {
	Semester    string   `json:"Semester"`
	Year        int      `json:"Year"`
	Course      string   `json:"Course"`
	Link        string   `json:"Link"`
	Deadline    Deadline `json:"Deadline"`
	Description string   `json:"Description"`
}

func FormHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("In form handler")
	//unmarshal json object
	var hw *Homework
	err := json.NewDecoder(r.Body).Decode(&hw)
	if err != nil {
		fmt.Println("problem with json decoding")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//ideally we'd register it into a database
	// and then another go function would display it from the db to the the user

	//pretty print it onto the webpage
	out, err := json.MarshalIndent(hw, "", "	")
	if err != nil {
		fmt.Println("problem with json marshaling")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(string(out))
}

func HostOnFS(toHost, endpointName string) {
	fmt.Println("Directory Page endpoint hit!")
	fs := http.FileServer(http.Dir(toHost))
	http.Handle(endpointName+"/", http.StripPrefix(endpointName+"/", fs))
}
