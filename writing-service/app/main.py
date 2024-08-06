from fastapi import FastAPI, Depends
from typing import Annotated
from app.db.session import get_session
from app.models.writing_prompt import WritingPrompt
from app.enums.writing_task import WritingTask
from . import dependencies

app = FastAPI()

@app.get('/')
def create_writing_prompt(db: Annotated[get_session, Depends()]):
    prompt = WritingPrompt(content='some content', task=WritingTask.ESSAY)
    db.add(prompt)
    db.commit()
    db.refresh(prompt)
    return prompt