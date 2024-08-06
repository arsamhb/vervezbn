from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import BaseModel

DATABASE_URL = 'postgresql://postgres:secret@localhost:5431/vervez'
engine = create_engine(DATABASE_URL, echo=True)
Session = sessionmaker(autoflush=False, bind=engine)

def init_db():
    BaseModel.metadata.create_all(bind=engine)