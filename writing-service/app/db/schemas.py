from pydantic import BaseModel, Field
from typing import List
from app.enums.writing_task import WritingTask
from app.enums.writing_status import WritingStatus

class WritingPropmtBase(BaseModel):
    content: str = Field(min_length=20, max_length=200)
    task: WritingTask

class WritingPromptCreate(WritingPropmtBase):
    pass 

class WritingPrompt(WritingPropmtBase):
    id: int
    class Config:
        orm_mode = True


class WritingBase(BaseModel):
    user_id: str

class WritingCreate(WritingBase):
    pass

class Writing(WritingBase):
    id: int 
    status: WritingStatus
    writing_prompt_id: str
    writing_prompt: WritingPrompt
    # examiners: List[Examiner]
    class Config:
        orm_mode = True 
