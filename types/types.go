package types

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	RemindTime  string `json:"remindtime"`
	IsCompleted bool   `json:"iscompleted,"`
	IsRecurring bool   `json:"isrecurring"`
	Frequency   string `json:"frequency,omitempty"`
}
