from typing import List
from src.base_model import CamelModel
from datetime import date


class Cell(CamelModel):

    type: str
    id: str
    geometry: dict
    geometry_name: str
    properties: dict
    bbox: List[float]

class Alert(CamelModel):
    effective: date
    expires: date
    category: str
    severity: str
    description: str
