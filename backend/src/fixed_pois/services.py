from typing import List
from sqlalchemy.orm import Session

from .models import FixedPoi
from src.data.db import crud


def get_all_fixed_pois(db: Session) -> List[FixedPoi]:
    return crud.get_all_fixed_pois(db)
