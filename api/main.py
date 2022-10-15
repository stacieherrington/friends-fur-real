from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    pet,
    adoption_application,
    rescue,
    success_story,
    accounts,
    auth,
    sockets,
)

app = FastAPI(
    title="Friends Fur Real - Routers",
    description="Your destination for testing routers for each of the following: "
    " Accounts, Pets, Adoption Applications and Success Stories",
    version="2.0.2.2",
    redoc_url="/docs",
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
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(pet.router, tags=["Pets"])
app.include_router(rescue.router, tags=["Rescues"])
app.include_router(success_story.router, tags=["Stories"])
app.include_router(adoption_application.router, tags=["Adoption Applications"])
app.include_router(auth.authenticator.router)
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(sockets.router)
