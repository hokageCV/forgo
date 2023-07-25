package storage

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func getDBFilePath() (string, error) {
	// Get the user's application data directory path
	appDataDir, err := os.UserConfigDir()
	if err != nil {
		return "", err
	}

	dbDir := filepath.Join(appDataDir, "forgo")
	err2 := os.MkdirAll(dbDir, 0755)
	if err2 != nil {
		return "", err2
	}

	return filepath.Join(dbDir, "tasks.db"), nil
}

func InitializeDB() error {
	dbFilePath, err := getDBFilePath()
	if err != nil {
		log.Fatal(err)
		return err
	}

	// initialize DB connection
	DB, err = sql.Open("sqlite3", dbFilePath)
	if err != nil {
		log.Fatal(err)
		return err
	}

	_, err = DB.Exec(`
		CREATE TABLE IF NOT EXISTS tasks (
			id TEXT PRIMARY KEY,
			title TEXT,
			reminddate TEXT,
			remindtime TEXT,
			isrecurring BOOLEAN,
			frequency TEXT,
			iscompleted BOOLEAN
		)
	`)
	if err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
