from typing import List
from app.enums.writing_task import WritingTask
from app.db.session import Session
from app.db.models import WritingPrompt
from sqlalchemy import select


def create_writing_prompt(content: str, task: WritingTask):
    with Session() as session:
        new_prompt = WritingPrompt(content=content, task=task)
        session.add(new_prompt)
        session.commit()
        session.refresh(new_prompt)
        return new_prompt


def match_writing_prompt(previous_matched: List[int], task: WritingTask):
    with Session() as session:
        matched = session.query(WritingPrompt).filter(WritingPrompt.task == task).filter(
            WritingPrompt.id.notin_(previous_matched)).first()
        print('matched', matched)
        return matched
