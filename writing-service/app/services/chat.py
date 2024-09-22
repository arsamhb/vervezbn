from app.classes.singleton_meta import SingletonMeta
from app.services.config import ConfigService
from openai import OpenAI

class Chat(metaclass=SingletonMeta):
    def __init__(self) -> None:
        api_key = ConfigService.get('OPENAI_API_KEY')
        self.client = OpenAI(api_key=api_key)
    
    def ask(self, q: str) -> str:
        response = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": q
                }
            ],
            model='gpt-3.5-turbo'
        )
        return response.choices[0].message.content