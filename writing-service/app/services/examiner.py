from fastapi import HTTPException, status
from typing import List
from app.enums.writing_examiner_type import WritingExaminerType
from app.classes.examiners import ExaminerClass, FreeExaminer, PremiumExaminer
from app.db.schemas import ExaminerCreate
from app.repositories.examiner import create_bulk, get_by_type
from app.repositories.writing import get_prompt_by_id

def getExaminerClass(examinerType: WritingExaminerType) -> ExaminerClass:
    match examinerType:
        case WritingExaminerType.FREE:
            return FreeExaminer()
        case WritingExaminerType.PREMIUM:
            return PremiumExaminer()


def examine(writing_id: int, writing: str):
    examiners: List[ExaminerCreate] = []
    for examinerType in WritingExaminerType:
        prompt = get_prompt_by_id(writing_id)
        examiner = getExaminerClass(examinerType)
        examiners.append(ExaminerCreate(comment=examiner.examine(
            writing, prompt), type=examinerType.value, writing_id=writing_id))
    create_bulk(examiners)

def get_examiner_of_writing_by_type(writing_id: int, type: WritingExaminerType):
    return get_by_type(writing_id, type)

def get_comment(writing_id: int, type: WritingExaminerType):
    examiner = get_by_type(writing_id, type)
    if not examiner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='examiner not found')
    examiner_class = getExaminerClass(type)
    return examiner_class.parse(examiner.comment)
