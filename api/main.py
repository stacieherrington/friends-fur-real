from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    pet,
    application,
    rescue,
    story,
    accounts,
    auth,
)

app = FastAPI(
    title="Friends Fur Real - Routers",
    description="Your destination for testing routers for each of the following models: "
    " Accounts, Pets, Adoption Applications and Success Stories"
    "  ©"
    "Pawsibilities 2022",
    version="16.4.0.2",
    docs_url="/pawsible",
    contact={
        "name": "Friends Fur Real",
        "url": "http://localhost:3000",
    },
    license_info={
        "name": "©Pawsibilities2022",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost"),
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(pet.router)
app.include_router(rescue.router)
app.include_router(story.router)
app.include_router(application.router)
app.include_router(auth.authenticator.router)
app.include_router(accounts.router)
