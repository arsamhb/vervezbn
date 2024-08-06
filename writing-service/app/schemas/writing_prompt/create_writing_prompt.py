from pydantic import BaseModel, Field
from app.enums.writing_task import WritingTask

class CreateWritingPromptDto(BaseModel):
    task: WritingTask
    content: str = Field(min_length=20, max_length=200)