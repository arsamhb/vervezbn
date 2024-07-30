package services

import (
	"gopkg.in/gomail.v2"
)

func SendWritingComment() {
	m := gomail.NewMessage()
	m.SetHeader("From", "WritingAgent@vervedevlab.com")
	m.SetHeader("To", "arsam.hb@gmail.com")
	m.SetHeader("Subject", "writing review comment")
	m.SetBody("text/html", "YOU HAD A PERFECT WRITING TASK")

	d := gomail.NewDialer("smtp.gmail.com", 587, "arsam.hb@gmail.com", "wxbwyuspvmbnwxlb")

	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}
}
