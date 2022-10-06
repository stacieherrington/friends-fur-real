from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import pet, adoption_application, rescue, success_story, accounts

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(pet.router)
app.include_router(rescue.router)
app.include_router(success_story.router)
app.include_router(adoption_application.router)
app.include_router(accounts.router)
