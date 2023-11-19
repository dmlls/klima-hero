from datetime import datetime
from enum import Enum
from pydantic import field_validator, conint
from typing import List
from src.base_model import CamelModel


class PoiType(Enum):

    FLOOD = "Flood"
    FALLEN_TREE = "Fallen Tree"
    OTHER = "Other"


class PutThreadMessageRequest(CamelModel):

    author: str
    content: str
    creation_date: datetime = datetime.now()

    class Config:
        from_attributes = True


class ThreadMessage(PutThreadMessageRequest):

    id: str

    @field_validator("id", mode="before")
    @classmethod
    def id2str(cls, v):
        return str(v)


class PoiRequest(CamelModel):

    latitude: float
    longitude: float
    poi_type: PoiType
    thread: List[PutThreadMessageRequest] = []
    upvotes: conint(ge=0) = 0
    creation_date: datetime = datetime.now()
    related_event: str = ""
    official: bool
    active: bool = True

    class Config:
        from_attributes = True


class Poi(PoiRequest):

    id: str
    icon_url: str


class GetClosestPoisRequest(CamelModel):
    long: float
    lat: float
    top_k: int = 5
