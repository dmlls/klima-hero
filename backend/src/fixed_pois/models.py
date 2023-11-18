from enum import Enum
from pydantic import field_validator
from src.base_model import CamelModel


class FixedPoiType(Enum):

    FOUNTAIN = "fountain"


class FixedPoiRequest(CamelModel):

    latitude: float
    longitude: float
    poi_type: FixedPoiType

    class Config:
        from_attributes = True


class FixedPoi(FixedPoiRequest):

    id: str

    @field_validator("id", mode="before")
    @classmethod
    def id2str(cls, v):
        return str(v)
