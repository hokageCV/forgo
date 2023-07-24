package storage

import (
	"log"

	"github.com/google/uuid"
	"github.com/hokagecv/forgo/types"
)

func GetAllTasksFromDB() ([]types.Task, error) {
	rows, err := DB.Query(`SELECT * FROM tasks`)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	var taskList []types.Task
	for rows.Next() {
		var task types.Task

		err := rows.Scan(&task.ID, &task.Title, &task.RemindTime, &task.IsRecurring, &task.Frequency, &task.IsCompleted)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		taskList = append(taskList, task)
	}

	return taskList, nil
}

func GetOneTaskFromDB(taskID string) (types.Task, error) {
	row := DB.QueryRow(`SELECT id, title, remindtime, isrecurring, frequency, iscompleted
		FROM tasks WHERE id = ?`, taskID)

	var task types.Task

	err := row.Scan(&task.ID, &task.Title, &task.RemindTime, &task.IsRecurring, &task.Frequency, &task.IsCompleted)
	if err != nil {
		return types.Task{}, err
	}

	return task, nil
}

func CreateTaskInDB(task types.Task) error {
	taskID := uuid.New().String()

	_, err := DB.Exec(`
		INSERT INTO tasks (id, title, remindtime, isrecurring, frequency, iscompleted)
		VALUES (?, ?, ?, ?, ?, ?)
	`, taskID, task.Title, task.RemindTime, task.IsRecurring, task.Frequency, task.IsCompleted)
	if err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
