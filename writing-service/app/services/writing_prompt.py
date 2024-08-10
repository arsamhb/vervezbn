from app.repositories.writing_prompt import create_writing_prompt
from app.db.schemas import WritingPromptCreate

def create(writing_prompt: WritingPromptCreate):
    return create_writing_prompt(writing_prompt.content, writing_prompt.task)