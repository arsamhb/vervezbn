from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base import Base

DATABASE_URL = 'postgresql://postgres:secret@localhost:5431/vervez'
engine = create_engine(DATABASE_URL)
Session = sessionmaker(autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)