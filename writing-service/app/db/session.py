from .base import Session

def get_connection():
    connection = Session()
    try:
        yield connection 
    finally: 
        connection.close()