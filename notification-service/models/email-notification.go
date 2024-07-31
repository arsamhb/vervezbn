package models

import "time"

type NotificationType string

const (
	VerificationEmail   NotificationType = "verification_email"
	WritingCommentEmail NotificationType = "writing_comment_email"
)

type EmailNotification struct {
	ID               uint `gorm:"primaryKey"`
	UserId           string
	NotificationType NotificationType `gorm:"type:varchar(50)"`
	CreatedAt        time.Time
}
