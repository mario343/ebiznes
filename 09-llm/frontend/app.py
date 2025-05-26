from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi import HTTPException
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

import httpx

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

LLAMA_BACKEND_URL = "http://localhost:8000/chat"


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


class Message(BaseModel):
    text: str


@app.post("/send")
async def send_message(payload: Message):
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                LLAMA_BACKEND_URL,
                json={"text": payload.text},
            )
            response.raise_for_status()
            return {"reply": response.json().get("reply", "")}
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Ollama backend timeout")
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=502, detail=f"Ollama connection error: {e}")
