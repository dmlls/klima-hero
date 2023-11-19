from typing import List
from src.base_model import CamelModel
from datetime import datetime


class Cell(CamelModel):

    id: str
    type: str
    geometry: dict
    geometry_name: str
    properties: dict
    bbox: List[float]


class Alert(CamelModel):

    effective: datetime
    expires: datetime
    category: str
    severity: str
    description: str
    id: str
    icon_url: str
    latitude: float
    longitude: float

