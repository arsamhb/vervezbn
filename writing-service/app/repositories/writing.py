from app.db.session import Session
from sqlalchemy import select
from sqlalchemy.orm import subqueryload
from app.db.models import Writing
from app.enums.writing_status import WritingStatus


def find_in_progress_with_user_id(user_id: str):
    with Session() as session:
        in_progress_writings = session.query(Writing).filter(
            Writing.user_id == user_id).filter(Writing.status == WritingStatus.IN_PROGRESS).options(
            subqueryload(Writing.writing_prompt)).first()
        return in_progress_writings


def find_finished_writing_prompt_with_user_id(user_id: str):
    with Session() as session:
        finished_writings = session.query(Writing.writing_prompt_id).filter(
            Writing.user_id == user_id).filter(Writing.status == WritingStatus.FINISHED).all()
        return [r for r, in finished_writings]


def create_one(user_id: str, writing_prompt_id: int):
    with Session() as session:
        new_writing = Writing(
            user_id=user_id, writing_prompt_id=writing_prompt_id)
        session.add(new_writing)
        session.commit()
        session.refresh(new_writing)
        return new_writing
