package api

import (
	"github.com/gorilla/mux"
)

func SetupRoutes() {
	router := mux.NewRouter()

	router.HandleFunc("/api/tasks", GetAllTasks).Methods("GET")
	router.HandleFunc("/api/task", GetTaskByID).Methods("GET")
	router.HandleFunc("/api/tasks", CreateTask).Methods("POST")

}
