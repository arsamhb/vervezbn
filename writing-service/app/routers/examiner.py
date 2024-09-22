from fastapi import APIRouter
from app.enums.writing_examiner_type import WritingExaminerType
from app.db.schemas import Examiner
from app.services.examiner import get_comment
from typing import Union
from app.schemas.examiner.free_examiner_response import FreeExaminerResponse
from app.schemas.examiner.prem_examiner_response import PremExaminerResponse

router = APIRouter(prefix='/examiner')


@router.get('/{writing_id}', response_model=Union[FreeExaminerResponse, PremExaminerResponse])
def get_examiner(writing_id: int, type: WritingExaminerType):
    comment = get_comment(writing_id, type)
    return comment
