from .base import Base
from typing import List
from sqlalchemy import String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.enums.writing_status import WritingStatus


class Writing(Base):
    __tablename__ = 'writing'

    id: Mapped[int] = mapped_column(primary_key=True)
    status = mapped_column(Enum(WritingStatus))
    writing_prompt_id: Mapped[int] = mapped_column(ForeignKey('writing_prompt.id'))
    writing_prompt = relationship('WritingPrompt', back_populates='writings')
    examiners = relationship('Examiner', back_populates='writing', cascade='all')
    user_id: Mapped[str] = mapped_column(String(30))