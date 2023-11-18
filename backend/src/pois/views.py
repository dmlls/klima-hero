from fastapi import APIRouter, Depends, status
from .models import Poi, PutPoiRequest
from typing import List

router = APIRouter()


@router.put("", status_code=status.HTTP_201_CREATED)
def put_poi_view(request: PutPoiRequest):
    pass


@router.get("", response_model=List[Poi])
def get_all_pois_view():
    return "All POIs!"
