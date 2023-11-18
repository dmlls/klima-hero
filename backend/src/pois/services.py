import numpy as np
from typing import List
from geopy.distance import geodesic
from sqlalchemy.orm import Session

from .models import PoiRequest, Poi
from src.data.db import crud, schemas


def create_poi(db: Session, poi: PoiRequest) -> None:
    db_poi = schemas.PoiCreate(**poi.dict())
    crud.create_poi(db, db_poi)


def update_poi(db: Session, poi_id: str, poi: PoiRequest) -> None:
    db_poi = schemas.PoiCreate(**poi.dict())
    crud.update_poi(db, poi_id, db_poi)


def get_all_pois(db: Session) -> List[Poi]:
    return crud.get_all_pois(db)


def get_closest_pois(
    db: Session,
    long: float,
    lat: float,
    top_k: int=5
) -> List[Poi]:
    pois = get_all_pois(db)
    distances = [geodesic((long, lat), (poi.long, poi.lat)).meters for poi in pois]
    sorted_indexes = np.argsort(distances)
    return [pois[i] for i in sorted_indexes][:top_k]
