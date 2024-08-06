from fastapi import APIRouter
from app.schemas.writing_prompt.create_writing_prompt import CreateWritingPromptDto
from app.services import writing_prompt as writing_prompt_service


router = APIRouter(prefix='/writing-prompt')

@router.post('')
def create_writing_prompt(writing_prompt: CreateWritingPromptDto):
    return writing_prompt_service.create(writing_prompt)