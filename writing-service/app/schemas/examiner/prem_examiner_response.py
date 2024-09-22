from pydantic import BaseModel
from typing import List

class PremExaminerResponseItem(BaseModel):
    start: int 
    end: int
    comment: str

class PremExaminerResponse(BaseModel):
    items: List[PremExaminerResponseItem]