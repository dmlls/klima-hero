"""Probably Something Awesome backend."""

import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import api_router_root, api_router_v1
from src.data.db import models, database

logger = logging.getLogger(__name__)

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()
api_root = FastAPI(title="Probably Something Awesome")
api_v1 = FastAPI(
    title="Probably Something Awesome",
    description="Probably Something Awesome Backend",
    root_path="/api/v1",
    docs_url=None,
    openapi_url="/docs/openapi.json",
    redoc_url="/docs",
)

# CORS
origins = [
    "*",
]

# Include middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware based authentication currently not working
# app.add_middleware(Authentication)

# Include routes
api_root.include_router(api_router_root)
api_v1.include_router(api_router_v1)

# Mount API routes
# Order matters! More specific routes must come first.
app.mount("/api/v1", app=api_v1)
app.mount("/", app=api_root)
