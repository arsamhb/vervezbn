from typing import List
from sqlalchemy import String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.enums.writing_status import WritingStatus
from . import BaseModel

class Writing(BaseModel):
    __tablename__ = 'writing'

    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[WritingStatus] = mapped_column(Enum(WritingStatus))
    user_id: Mapped[str] = mapped_column(String(30))
    writing_prompt_id: Mapped[int] = mapped_column(ForeignKey('writing_prompt.id'))
    writing_prompt: Mapped[List['WritingPrompt']] = relationship(back_populates='writings')
    examiners: Mapped[List['Examiner']] = relationship(back_populates='writing')