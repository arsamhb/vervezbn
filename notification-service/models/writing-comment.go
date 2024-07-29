package models

import "time"

type WritingComment struct {
	ID        uint
	UserId    string
	CueId     string
	CreatedAt time.Time
	UpdatedAt time.Time
}
