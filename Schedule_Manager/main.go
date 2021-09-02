package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Gurv33r/Schedule_Manager/server"
)

func main() {
	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		fmt.Println("Root endpoint hit!")
		fmt.Fprintf(rw, "Hello, World!")
	})
	server.HostOnFS("./client", "/new")
	http.HandleFunc("/api/hw", server.FormHandler)
	log.Fatal(http.ListenAndServe(":5501", nil))
}
