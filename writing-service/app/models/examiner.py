from .base import Base
from typing import List
from sqlalchemy import String, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.enums.writing_examiner_type import WritingExaminerType
# from .writing import Writing

class Examiner(Base):
    __tablename__ = 'examiner'

    id: Mapped[int] = mapped_column(primary_key=True)
    comment: Mapped[str] = mapped_column(String(250))
    type = mapped_column(Enum(WritingExaminerType))
    writing_id: Mapped[int] = mapped_column(ForeignKey('writing.id'))
    writing = relationship('Writing', back_populates='examiners')