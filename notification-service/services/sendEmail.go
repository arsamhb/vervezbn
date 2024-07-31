package services

import (
	"os"
	"strconv"

	"gopkg.in/gomail.v2"
)

func createEmailToSend(receiver string, subject string, body string) *gomail.Message {
	m := gomail.NewMessage()
	m.SetHeader("From", "vervedevlab@gmail.com")
	m.SetHeader("To", receiver)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)

	return m
}

func submitEmail(dialer *gomail.Message) {
	envPort := os.Getenv("EMAIL_PORT")
	port, _ := strconv.Atoi(envPort)

	d := gomail.NewDialer(os.Getenv("EMAIL_HOST"), port, os.Getenv("EMAIL_USERNAME"), os.Getenv("EMAIL_PASSWORD"))
	if err := d.DialAndSend(dialer); err != nil {
		panic(err)
	}
}

func SendWritingComment(receiver string, url string) {
	m := createEmailToSend(receiver, "Your writing comment is read", url)
	submitEmail(m)
}

func SendVerificationEmail(receiver string, url string) {
	m := createEmailToSend(receiver, "Verify your account", url)
	submitEmail(m)
}
