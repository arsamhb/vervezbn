from sqlalchemy.orm import DeclarativeBase

class BaseModel(DeclarativeBase):
    pass

from .examiner import Examiner
from .writing import Writing
from .writing_prompt import WritingPrompt