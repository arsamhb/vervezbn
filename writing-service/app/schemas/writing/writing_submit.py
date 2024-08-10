from pydantic import BaseModel, Field

class WritingSubmit(BaseModel):
    writing_id: int
    writing: str = Field(max_length=300)