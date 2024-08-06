from typing import List
from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.enums.writing_task import WritingTask
from . import BaseModel

class WritingPrompt(BaseModel):
    __tablename__ = 'writing_prompt'

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(200))
    task: Mapped[WritingTask] = mapped_column(Enum(WritingTask))
    writings: Mapped[List['Writing']] = relationship(back_populates='writing_prompt')