from os import read
from fastapi import APIRouter
from .models import Cell, Alert
from typing import List
from .services import generate_alert, read_cells, generate_oktoberfest, warning_cells

router = APIRouter()


@router.get("/warning-cells", response_model=List[Cell])
def get_warning_cells():
    return read_cells()

@router.get("/warning-cells/active", response_model=List[Cell])
def get_active_warning_cells():
    return warning_cells()

@router.get("/alerts", response_model=List[Alert])
def get_alerts():
    return [Alert(**generate_alert())]


@router.get("/alerts/of", response_model=Alert)
def oktober_fest():
    return generate_oktoberfest()
