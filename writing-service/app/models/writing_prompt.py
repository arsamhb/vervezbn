from .base import Base
from typing import List
from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.enums.writing_task import WritingTask

class WritingPrompt(Base):
    __tablename__ = 'writing_prompt'

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(200))
    task = mapped_column(Enum(WritingTask))
    writings = relationship(
        'Writing',
        back_populates='writing_prompt', cascade='all'
    )

