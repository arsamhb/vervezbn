from typing import List
from app.db.session import Session
from app.enums.writing_examiner_type import WritingExaminerType
from app.db.models import Examiner
from app.db.schemas import ExaminerCreate


def create_bulk(examiners: List[ExaminerCreate]):
    with Session() as session:
        for examiner in examiners:
            examiner = Examiner(**examiner.model_dump())
            session.add(examiner)
        session.commit()
        return


def get_by_type(writing_id: int, type: WritingExaminerType):
    with Session() as session:
        return session.query(Examiner).filter(Examiner.writing_id ==
                                       writing_id).filter(Examiner.type == type).first()
