from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .models import FixedPoi
from .services import get_all_fixed_pois
from src.data.db import database

router = APIRouter()


@router.get("/all", response_model=List[FixedPoi])
def get_all_fixed_pois_view(db: Session = Depends(database.get_db)):
    return get_all_fixed_pois(db)
