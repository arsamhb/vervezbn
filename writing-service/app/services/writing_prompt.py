from app.repositories.writing_prompt import create_writing_prompt
from app.schemas.writing_prompt.create_writing_prompt import CreateWritingPromptDto

def create(writing_prompt: CreateWritingPromptDto):
    return create_writing_prompt(writing_prompt.content, writing_prompt.task)