package main

import (
	"context"

	"github.com/google/uuid"
	"github.com/hokagecv/forgo/storage"
	"github.com/hokagecv/forgo/types"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// =====================================
func (a *App) GetAllTasks() []types.Task {
	tasks, err := storage.GetAllTasksFromDB()
	if err != nil {
		return nil
	}

	return tasks
}

func (a *App) GetTaskByID(taskID string) *types.Task {
	task, err := storage.GetOneTaskFromDB(taskID)
	if err != nil {
		return nil
	}
	return &task
}

func (a *App) CreateTask(title string, remindtime string, isrecurring bool, frequency string) error {
	var task = types.Task{
		ID:          uuid.New().String(),
		Title:       title,
		RemindTime:  remindtime,
		IsCompleted: false,
		IsRecurring: isrecurring,
		Frequency:   frequency,
	}

	err := storage.CreateTaskInDB(task)
	if err != nil {
		return err
	}
	return nil
}
