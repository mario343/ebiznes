## to run frontend (in /frontend)

`uvicorn app:app --reload --port 3000`

## to run backend (in /llm_service)

`uvicorn main:app --reload --port 8000`

## keep in mind that you need to have running ollama server in the background,so:

`ollama run llama3`

if you want to close the server (on ubuntu):
`systemctl stop ollama.service`
