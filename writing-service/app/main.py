from fastapi import FastAPI
from . import dependencies
from app.routers.writing_prompts import router as writing_prompts_router


app = FastAPI()

app.include_router(writing_prompts_router)