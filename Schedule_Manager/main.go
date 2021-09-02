package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/Gurv33r/Schedule_Manager/server"
)

func main() {
	//get all env variables
	dialect, host, dbport, user, dbname, password := LoadEnv()
	//establish db connection string
	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable")
	/* To establish a db connection, you need to load the connection request with info.
	Particularly, it needs a host, a user to access, the specific db name, level of security, port to open on, and password of registered user)
	sslmode is used for security, so disabling it is like sending an HTTP request, while keeping it enabled by setting it to 'verify-full' is like HTTPS*/
	BootupHTTPServer()
}

func BootupHTTPServer(port int){
	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		fmt.Println("Root endpoint hit!")
		fmt.Fprintf(rw, "Hello, World!")
	})
	server.HostOnFS("./client", "/new")
	http.HandleFunc("/api/hw", server.FormHandler)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func LoadEnv() []string{
	return []string{
		os.Getenv("DIALECT"),
		os.Getenv("HOST"),
		os.Getenv("DBPORT"),
		os.Getenv("USER"),
		os.Getenv("NAME"),
		os.Getenv("PASSWORD")
	}
}