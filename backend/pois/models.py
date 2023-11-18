from datetime import datetime
from enum import Enum
from pydantic import conint
from typing import List
from src.base_model import CamelModel


class PoiType(Enum):

    FLOOD = "Flood"


class ThreadMessage(CamelModel):

    author: str
    content: str
    creation_date: datetime = datetime.now()


class Poi(CamelModel):

    id_: str
    latitude: float
    longitude: float
    poi_type: PoiType
    thread: List[ThreadMessage] = []
    upvotes: conint(ge=0) = 0
    creation_date: datetime = datetime.now()
    related_event: str = ""
    official: bool
    active: bool


class CreatePoiRequest(Poi):

    pass


class UpdatePoiRequest(Poi):

    pass
