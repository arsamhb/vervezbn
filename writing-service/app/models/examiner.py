from typing import List
from sqlalchemy import String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.enums.writing_examiner_type import WritingExaminerType
from . import BaseModel

class Examiner(BaseModel):
    __tablename__ = 'examiner'

    id: Mapped[int] = mapped_column(primary_key=True)
    comment: Mapped[str] = mapped_column(String(250))
    type: Mapped[WritingExaminerType] = mapped_column(Enum(WritingExaminerType))
    writing_id: Mapped[int] = mapped_column(ForeignKey('writing.id'))
    writing: Mapped['Writing'] = relationship(back_populates='examiners')
