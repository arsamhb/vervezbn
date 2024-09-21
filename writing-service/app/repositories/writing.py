from app.db.session import Session
from sqlalchemy.orm import subqueryload, joinedload
from app.db.models import Writing, WritingPrompt
from app.enums.writing_status import WritingStatus
from app.enums.writing_task import WritingTask


def find_in_progress_with_user_id(user_id: str, task: WritingTask):
    with Session() as session:
        in_progress_writings = session.query(Writing).join(WritingPrompt).filter(
            Writing.user_id == user_id).filter(Writing.status == WritingStatus.IN_PROGRESS).filter(WritingPrompt.task == task).options(joinedload(Writing.writing_prompt)).first()
        return in_progress_writings


def find_finished_writing_prompt_with_user_id(user_id: str, task: WritingTask):
    with Session() as session:
        finished_writings = session.query(Writing.writing_prompt_id).join(WritingPrompt).filter(
            Writing.user_id == user_id).filter(Writing.status == WritingStatus.FINISHED).filter(WritingPrompt.task == task).all()
        return [r for r, in finished_writings]


def create_one(user_id: str, writing_prompt_id: int):
    with Session() as session:
        new_writing = Writing(
            user_id=user_id, writing_prompt_id=writing_prompt_id)
        session.add(new_writing)
        session.commit()
        session.refresh(new_writing)
        return new_writing


def update_submission(writing_id: int, writing: str, status: WritingStatus = WritingStatus.IN_PROGRESS):
    with Session() as session:
        session.query(Writing).filter(Writing.id == writing_id).update(
            {'content': writing, 'status': status})
        session.commit()

def find_by_id(id: int):
    with Session() as session:
        return session.query(Writing).filter(Writing.id == id).first()