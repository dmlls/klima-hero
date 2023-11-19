import numpy as np
from typing import List
from geopy.distance import geodesic
from sqlalchemy.orm import Session

from .models import PoiRequest, Poi
from src.icons import icons
from src.data.db import crud, schemas
from src.utils import generate_id


def create_poi(db: Session, poi: PoiRequest) -> None:
    db_poi = schemas.PoiCreate(
        **poi.dict(),
        id=generate_id(),
        icon_url=icons[poi.poi_type.value]
    )
    crud.create_pois(db, db_poi)


def update_poi(db: Session, poi_id: str, poi: PoiRequest) -> bool:
    db_poi = schemas.PoiCreate(
        **poi.dict(),
        id=generate_id(),
        icon_url=icons[poi.poi_type.value]
    )
    updated = crud.update_poi(db, poi_id, db_poi)
    return updated


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
