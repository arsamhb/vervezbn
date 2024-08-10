from pydantic import BaseModel, Field
from typing import List
from app.enums.writing_task import WritingTask
from app.enums.writing_status import WritingStatus
from app.enums.writing_examiner_type import WritingExaminerType

class WritingPromptBase(BaseModel):
    content: str = Field(min_length=20, max_length=200)
    task: WritingTask

class WritingPromptCreate(WritingPromptBase):
    pass 

class WritingPrompt(WritingPromptBase):
    id: int
    class Config:
        orm_mode = True

class ExaminerBase(BaseModel):
    comment: str
    type: WritingExaminerType
    writing_id: int

class ExaminerCreate(ExaminerBase):
    pass 

class Examiner(ExaminerCreate):
    pass

class WritingBase(BaseModel):
    user_id: str

class WritingCreate(WritingBase):
    pass

class Writing(WritingBase):
    id: int 
    status: WritingStatus
    writing_prompt_id: str
    writing_prompt: WritingPrompt
    examiners: List[Examiner]
    class Config:
        orm_mode = True 
