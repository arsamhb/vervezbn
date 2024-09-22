from fastapi import FastAPI
from app.db.base import init_db
from app.routers.writing_prompts import router as writing_prompts_router
from app.routers.writing import router as writing_router
from app.routers.examiner import router as examiner_router
from app.services.config import ConfigService

ConfigService.load_env()
init_db()
app = FastAPI()
app.include_router(writing_prompts_router)
app.include_router(writing_router)
app.include_router(examiner_router)