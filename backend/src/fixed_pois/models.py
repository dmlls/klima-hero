from enum import Enum
from pydantic import field_validator
from src.base_model import CamelModel


class FixedPoiType(Enum):

    HOME = "Home"
    WORK = "Work"
    FOUNTAIN = "Fountain"


class FixedPoiRequest(CamelModel):

    latitude: float
    longitude: float
    poi_type: FixedPoiType

    class Config:
        from_attributes = True


class FixedPoi(FixedPoiRequest):

    id: str
    icon_url: str

    @field_validator("id", mode="before")
    @classmethod
    def id2str(cls, v):
        return str(v)
