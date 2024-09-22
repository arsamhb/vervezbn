from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()
api_key=os.getenv('OPENAI_API_KEY')
print(api_key)
client = OpenAI(api_key=api_key)
print(client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "just say test"
        },
    ],
    model='gpt-3.5-turbo'
).choices[0].message.content)
