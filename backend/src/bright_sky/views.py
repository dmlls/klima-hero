from os import read
from fastapi import APIRouter
from .models import Cell, Alert
from typing import List
from .services import generate_alert, read_cells, generate_oktoberfest

router = APIRouter()


@router.get("/warning-cells", response_model=List[Cell])
def get_warning_cells():
    return read_cells()

@router.get("/alerts", response_model=Alert)
def get_alerts():
    return generate_alert()

@router.get("/alerts/of", response_model=Alert)
def oktober_fest():
    return generate_oktoberfest()
