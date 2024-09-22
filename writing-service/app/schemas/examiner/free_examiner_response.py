from pydantic import BaseModel

class FreeExaminerResponse(BaseModel):
    score: int
    comment: str