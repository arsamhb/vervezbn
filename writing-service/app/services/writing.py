from fastapi import HTTPException, status
from app.db.schemas import WritingCreate
from app.repositories.writing import find_in_progress_with_user_id, find_finished_writing_prompt_with_user_id, create_one
from app.repositories.writing_prompt import match_writing_prompt
from app.schemas.writing.writing_submit import WritingSubmit
from app.repositories.writing import update_submission, find_by_id
from app.services.examiner import examine
from app.enums.writing_status import WritingStatus

def create(writing: WritingCreate):
    in_progress_writing = find_in_progress_with_user_id(**writing.model_dump())
    if in_progress_writing:
        return in_progress_writing.writing_prompt, in_progress_writing.id
    previous_writing_prompts = find_finished_writing_prompt_with_user_id(
        **writing.model_dump())
    matched_writing_prompt = match_writing_prompt(previous_writing_prompts, task=writing.task)
    created_writing = create_one(writing_prompt_id=matched_writing_prompt.id, user_id=writing.user_id)
    return matched_writing_prompt, created_writing.id

def submit(writing_submit: WritingSubmit):
    writing = find_by_id(writing_submit.writing_id)
    if writing.status == WritingStatus.FINISHED: 
        raise HTTPException(status.HTTP_409_CONFLICT, detail='Already Submitted')
    update_submission(status=WritingStatus.FINISHED, **writing_submit.model_dump())
    examine(**writing_submit.model_dump())