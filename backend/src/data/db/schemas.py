from src.pois.models import PoiRequest
from src.fixed_pois.models import FixedPoiRequest


class PoiCreate(PoiRequest):

    icon_url: str


class FixedPoiCreate(FixedPoiRequest):

    icon_url: str
