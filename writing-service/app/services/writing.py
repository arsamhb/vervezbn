from app.db.schemas import WritingCreate
from app.repositories.writing import find_in_progress_with_user_id, find_finished_writing_prompt_with_user_id, create_one
from app.repositories.writing_prompt import match_writing_prompt
from app.schemas.writing.writing_submit import WritingSubmit
from app.repositories.writing import update_submission
from app.services.examiner import examine
from app.enums.writing_status import WritingStatus

def create(writing: WritingCreate):
    in_progress_writing = find_in_progress_with_user_id(**writing.model_dump())
    if in_progress_writing:
        return in_progress_writing.writing_prompt, in_progress_writing.id
    previous_writing_prompts = find_finished_writing_prompt_with_user_id(
        **writing.model_dump())
    matched_writing_prompt = match_writing_prompt(previous_writing_prompts)
    created_writing = create_one(writing_prompt_id=matched_writing_prompt.id, **writing.model_dump())
    return matched_writing_prompt, created_writing.id

def submit(writing_submit: WritingSubmit):
    update_submission(status=WritingStatus.FINISHED, **writing_submit.model_dump())
    examine(**writing_submit.model_dump())