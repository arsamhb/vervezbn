from fastapi import APIRouter
from app.db.schemas import WritingCreate, WritingPrompt
from app.services.writing import create, submit
from app.schemas.writing.writing_submit import WritingSubmit
from app.schemas.writing.writing_create_response import WritingCreateResponse

router = APIRouter(prefix='/writing')


@router.post('', response_model=WritingCreateResponse)
def create_writing(writing: WritingCreate):
    writing_prompt, writing_id = create(writing)
    return {
        'writing_prompt': writing_prompt,
        'writing_id': writing_id
    }


@router.post('/submit')
def submit_writing(writing_submit: WritingSubmit):
    submit(writing_submit)
