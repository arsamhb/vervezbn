from fastapi import APIRouter, status, HTTPException
from app.enums.writing_examiner_type import WritingExaminerType
from app.db.schemas import Examiner
from app.services.examiner import get_examiner_of_writing_by_type

router = APIRouter(prefix='/examiner')

@router.get('{writing_id}', response_model=Examiner)
def get_examiner(writing_id: int, type: WritingExaminerType):
    examiner = get_examiner_of_writing_by_type(writing_id, type)
    if not examiner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='examiner not found')
    return examiner
