from fastapi import FastAPI
from app.db.base import init_db
from app.routers.writing_prompts import router as writing_prompts_router
from app.routers.writing import router as writing_router

init_db()
app = FastAPI()
app.include_router(writing_prompts_router)
app.include_router(writing_router)