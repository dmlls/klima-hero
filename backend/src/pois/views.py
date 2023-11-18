from datetime import datetime
from fastapi import APIRouter, Depends, status
from .models import Poi, PoiType, PutPoiRequest
from typing import List

router = APIRouter()


@router.put("", status_code=status.HTTP_201_CREATED)
def put_poi_view(request: PutPoiRequest):
    pass


@router.get("", response_model=List[Poi])
def get_all_pois_view():
    return [
        Poi(
            id="0",
            latitude=48.2627204,
            longitude=11.6685920,
            poi_type=PoiType.FLOOD,
            thread=[],
            upvotes=0,
            creation_date=datetime(2023, 11, 18),
            related_event="",
            official=True,
            active=True,
        ),
        Poi(
            id="1",
            latitude=48.1611227,
            longitude=11.5897455,
            poi_type=PoiType.FLOOD,
            thread=[],
            upvotes=0,
            creation_date=datetime(2023, 11, 18),
            related_event="",
            official=True,
            active=True,
        )
    ]
