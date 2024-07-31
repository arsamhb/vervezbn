package templates

import (
	"bytes"
	"html/template"
)

func CreateHtmlBody(url string, title string, text string) (string, error) {
	const tpl = `<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>{{.Title}}</title>
					</head>
					<body>
						<h1>{{.Title}}</h1>
						<p>{{.Text}}</p>
						<a href="{{.URL}}">CLICK HERE</a>
					</body>
					</html>`

	data := struct {
		URL   string
		Title string
		Text  string
	}{
		URL:   url,
		Title: title,
		Text:  text,
	}

	t, err := template.New("email").Parse(tpl)
	if err != nil {
		return "", err
	}

	var tplBuffer bytes.Buffer
	if err := t.Execute(&tplBuffer, data); err != nil {
		return "", err
	}

	return tplBuffer.String(), nil
}
