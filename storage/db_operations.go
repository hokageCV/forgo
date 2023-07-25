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

		err := rows.Scan(&task.ID, &task.Title, &task.RemindDate, &task.RemindTime, &task.IsRecurring, &task.Frequency, &task.IsCompleted)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		taskList = append(taskList, task)
	}

	return taskList, nil
}

func GetOneTaskFromDB(taskID string) (types.Task, error) {
	row := DB.QueryRow(`SELECT id, title, reminddate, remindtime, isrecurring, frequency, iscompleted
		FROM tasks WHERE id = ?`, taskID)

	var task types.Task

	err := row.Scan(&task.ID, &task.Title, &task.RemindDate, &task.RemindTime, &task.IsRecurring, &task.Frequency, &task.IsCompleted)
	if err != nil {
		return types.Task{}, err
	}

	return task, nil
}

func CreateTaskInDB(task types.Task) error {
	taskID := uuid.New().String()

	stmt, err := DB.Prepare(`INSERT INTO tasks 
	(id, title, reminddate, remindtime, isrecurring, frequency, iscompleted)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}

	_, err = stmt.Exec(taskID, task.Title, task.RemindDate, task.RemindTime, task.IsRecurring, task.Frequency, task.IsCompleted)
	if err != nil {
		return err
	}

	return nil
}

func UpdateTaskInDB(task types.Task) error {
	stmt, err := DB.Prepare(`UPDATE tasks 
		SET title = ?, reminddate=?, remindtime = ?, isrecurring = ?, frequency = ?, iscompleted = ?
		WHERE id = ?
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(task.Title, task.RemindDate, task.RemindTime, task.IsRecurring, task.Frequency, task.IsCompleted, task.ID)
	if err != nil {
		return err
	}

	return nil
}

func DeleteTaskFromDB(taskID string) error {
	stmt, err := DB.Prepare(`DELETE FROM tasks WHERE id = ?`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(taskID)
	if err != nil {
		return err
	}

	return nil
}
