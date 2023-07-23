package api

import (
	"encoding/json"
	"net/http"

	"github.com/hokagecv/forgo/storage"
	"github.com/hokagecv/forgo/types"
)

func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	tasks, err := storage.GetAllTasksFromDB()
	if err != nil {
		http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func GetTaskByID(w http.ResponseWriter, r *http.Request) {
	taskID := r.URL.Query().Get("id")

	task, err := storage.GetOneTaskFromDB(taskID)
	if err != nil {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task types.Task

	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		http.Error(w, "Invalid task data", http.StatusBadRequest)
		return
	}

	err = storage.CreateTaskInDB(task)
	if err != nil {
		http.Error(w, "Failed to create task", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
