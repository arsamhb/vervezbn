from pydantic import BaseModel, Field

class WritingSubmit(BaseModel):
    writing_id: int
    writing: str = Field(min_length=100, max_length=500)