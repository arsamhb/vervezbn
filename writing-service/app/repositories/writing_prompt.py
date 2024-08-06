from app.enums.writing_task import WritingTask
from app.db.session import Session
from app.models.writing_prompt import WritingPrompt

def create_writing_prompt(content: str, task: WritingTask):
    with Session() as session:
        new_prompt = WritingPrompt(content=content, task=task)
        session.add(new_prompt)
        session.commit()
        session.refresh(new_prompt)
        return new_prompt
