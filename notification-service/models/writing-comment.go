package models

import (
	"time"
)

type WritingComment struct {
	ID        string
	CreatedAt time.Time
	UserId    string
	CueId     string
}
