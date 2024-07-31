package services

import (
	"gopkg.in/gomail.v2"
)

func SendWritingComment() {
	m := gomail.NewMessage()
	m.SetHeader("From", "vervedevlab@gmail.com")
	m.SetHeader("To", "arsam.hb@gmail.com")
	m.SetHeader("Subject", "WRITING REVIEW COMMENT")
	m.SetBody("text/html", "PROGRESS")

	d := gomail.NewDialer("smtp.gmail.com", 587, "vervedevlab@gmail.com", "ldjfdgrucvrdkegg")

	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}
}

func SendVerificationEmail() {
	m := gomail.NewMessage()
	m.SetHeader("From", "vervedevlab@gmail.com")
	m.SetHeader("To", "arsam.hb@gmail.com")
	m.SetHeader("Subject", "EMAIL VERIFICATION")
	m.SetBody("text/html", "PROGRESS")

	d := gomail.NewDialer("smtp.gmail.com", 587, "vervedevlab@gmail.com", "ldjfdgrucvrdkegg")

	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}
}
