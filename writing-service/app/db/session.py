from .base import Session

def get_session():
    session = Session()
    try:
        yield session 
    finally: 
        session.close()