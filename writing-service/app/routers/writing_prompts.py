from fastapi import APIRouter
from app.services import writing_prompt as writing_prompt_service
from app.db.schemas import WritingPrompt, WritingPromptCreate

router = APIRouter(prefix='/writing-prompt')

@router.post('', response_model=WritingPrompt)
def create_writing_prompt(writing_prompt: WritingPromptCreate):
    return writing_prompt_service.create(writing_prompt)