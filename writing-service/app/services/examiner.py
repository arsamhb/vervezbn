from typing import List
from app.enums.writing_examiner_type import WritingExaminerType
from app.classes.examiners import ExaminerClass, FreeExaminer, PremiumExaminer
from app.db.schemas import ExaminerCreate
from app.repositories.examiner import create_bulk, get_by_type

def getExaminerClass(examinerType: WritingExaminerType) -> ExaminerClass:
    match examinerType:
        case WritingExaminerType.FREE:
            return FreeExaminer()
        case WritingExaminerType.PREMIUM:
            return PremiumExaminer()


def examine(writing_id: int, writing: str):
    examiners: List[ExaminerCreate] = []
    for examinerType in WritingExaminerType:
        examiner = getExaminerClass(examinerType)
        examiners.append(ExaminerCreate(comment=examiner.examine(
            writing), type=examinerType, writing_id=writing_id))
    create_bulk(examiners)

def get_examiner_of_writing_by_type(writing_id: int, type: WritingExaminerType):
    return get_by_type(writing_id, type)
