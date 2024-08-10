from pydantic import BaseModel
from app.db.schemas import WritingPrompt

class WritingCreateResponse(BaseModel):
    writing_id: int
    writing_prompt: WritingPrompt