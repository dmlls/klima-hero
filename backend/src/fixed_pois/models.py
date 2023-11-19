from enum import Enum
from pydantic import field_validator
from src.base_model import CamelModel


class FixedPoiType(Enum):

    HOME = "Home"
    WORK = "Work"
    FOUNTAIN = "Fountain"


class FixedPoiRequest(CamelModel):

    id: str
    latitude: float
    longitude: float
    poi_type: FixedPoiType

    class Config:
        from_attributes = True


class FixedPoi(FixedPoiRequest):

    icon_url: str
