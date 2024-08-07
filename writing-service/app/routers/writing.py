from fastapi import APIRouter
from app.db.schemas import WritingCreate, WritingPrompt
from app.services.writing import create

router = APIRouter(prefix='/writing')

@router.post('', response_model=WritingPrompt)
def create_writing(writing: WritingCreate):
    return create(writing)