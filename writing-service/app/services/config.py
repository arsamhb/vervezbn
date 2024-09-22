from dotenv import load_dotenv as _load_dotenv
import os
class ConfigService:
    @staticmethod
    def load_env(env_path='.env'):
        _load_dotenv(dotenv_path=env_path)
    
    @staticmethod
    def get(key: str):
        return os.getenv(key)