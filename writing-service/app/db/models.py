from typing import List
from sqlalchemy import String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.enums.writing_status import WritingStatus
from .base import BaseModel
from app.enums.writing_task import WritingTask
from app.enums.writing_examiner_type import WritingExaminerType

class WritingPrompt(BaseModel):
    __tablename__ = 'writing_prompt'

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(200))
    task: Mapped[WritingTask] = mapped_column(Enum(WritingTask))
    writings: Mapped[List['Writing']] = relationship(back_populates='writing_prompt')

class Writing(BaseModel):
    __tablename__ = 'writing'

    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[WritingStatus] = mapped_column(Enum(WritingStatus))
    user_id: Mapped[str] = mapped_column(String(30))
    writing_prompt_id: Mapped[int] = mapped_column(ForeignKey('writing_prompt.id'))
    writing_prompt: Mapped[List['WritingPrompt']] = relationship(back_populates='writings')
    examiners: Mapped[List['Examiner']] = relationship(back_populates='writing')

class Examiner(BaseModel):
    __tablename__ = 'examiner'

    id: Mapped[int] = mapped_column(primary_key=True)
    comment: Mapped[str] = mapped_column(String(250))
    type: Mapped[WritingExaminerType] = mapped_column(Enum(WritingExaminerType))
    writing_id: Mapped[int] = mapped_column(ForeignKey('writing.id'))
    writing: Mapped['Writing'] = relationship(back_populates='examiners')

