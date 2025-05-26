from fastapi import FastAPI
from pydantic import BaseModel
import httpx

app = FastAPI()


class Message(BaseModel):
    text: str


@app.post("/chat")
async def chat_with_llama(message: Message):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "llama3",
                    "prompt": message.text,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9
                    }
                },
                timeout=20.0
            )
            response.raise_for_status()
            result = response.json()
            return {"reply": result.get("response", "")}
    except httpx.HTTPStatusError as e:
        return {"reply": f"Error contacting LLM service: {str(e)}"}

    except Exception as e:
        return {"reply": f"An error occurred: {str(e)}"}
