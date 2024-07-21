from fastapi import FastAPI

app = FastAPI()

@app.get('/{name}')
def index(name: str):
    return f'Hi {name}'