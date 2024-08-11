from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = 'postgresql://postgres:secret@localhost:5431/vervez'
engine = create_engine(DATABASE_URL, echo=True)
Session = sessionmaker(autoflush=False, autocommit=False, bind=engine)

class BaseModel(DeclarativeBase):
    pass

def init_db():
    BaseModel.metadata.create_all(bind=engine)