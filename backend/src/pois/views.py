from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from .models import Poi, PoiRequest, GetClosestPoisRequest
from .services import create_poi, get_all_pois, get_closest_pois
from src.data.db import database

router = APIRouter()


@router.put("", status_code=status.HTTP_201_CREATED)
def put_poi_view(
    request: PoiRequest,
    db: Session = Depends(database.get_db)
):
    create_poi(db, request)


@router.get("/all", response_model=List[Poi])
def get_all_pois_view(db: Session = Depends(database.get_db)):
    return get_all_pois(db)


@router.get("/closest", response_model=List[Poi])
def get_closest_pois_view(
    request: GetClosestPoisRequest,
    db: Session = Depends(database.get_db)
):
    return get_closest_pois(db, request.long, request.lat, request.top_k)
