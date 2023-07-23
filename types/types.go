package types

import (
	"time"
)

type RecurringFrequency string

const (
	Daily   RecurringFrequency = "daily"
	Weekly  RecurringFrequency = "weekly"
	Monthly RecurringFrequency = "monthly"
	Hourly  RecurringFrequency = "hourly"
)

type Task struct {
	ID          string             `json:"id"`
	Title       string             `json:"title"`
	RemindTime  time.Time          `json:"remindtime"`
	IsCompleted bool               `json:"iscompleted,"`
	IsRecurring bool               `json:"isrecurring"`
	Frequency   RecurringFrequency `json:"frequency,omitempty"`
}
