from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from .models import Poi, PoiRequest, GetClosestPoisRequest
from .services import create_poi, update_poi, get_all_pois, get_closest_pois
from src.data.db import database

router = APIRouter()


@router.put("", status_code=status.HTTP_201_CREATED)
def create_poi_view(
    request: PoiRequest,
    db: Session = Depends(database.get_db)
):
    create_poi(db, request)


@router.put("/{poi_id}")
def update_poi_view(
    poi_id: str,
    request: PoiRequest,
    response: Response,
    db: Session = Depends(database.get_db)
):
    updated = update_poi(db, poi_id, request)
    if not updated:
        response.status_code = status.HTTP_404_NOT_FOUND


@router.get("/all", response_model=List[Poi])
def get_all_pois_view(db: Session = Depends(database.get_db)):
    return get_all_pois(db)


@router.get("/closest", response_model=List[Poi])
def get_closest_pois_view(
    request: GetClosestPoisRequest,
    db: Session = Depends(database.get_db)
):
    return get_closest_pois(db, request.long, request.lat, request.top_k)
