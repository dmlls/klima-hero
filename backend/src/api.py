from fastapi import APIRouter
from .pois.views import router as pois_router

api_router_v1 = APIRouter()

api_router_v1.include_router(pois_router, prefix="/pois", tags=["pois"])

api_router_root = APIRouter()


@api_router_root.get("/", status_code=200)
def read_root():
    return "This is AWESOME!"
