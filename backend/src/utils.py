import hashlib
from datetime import datetime
from src.data.sources.parsing import (parse_drinking_water,
                                      parse_user_pois,
                                      parse_fixed_pois)
from src.fixed_pois.models import FixedPoiType
from src.data.db import database, crud, schemas

db = next(database.get_db())


def generate_id():
    return hashlib.sha256(str(datetime.now()).encode("utf-8")).hexdigest()[:8]


def populate_db():
    db_drinking_water = [
        schemas.FixedPoiCreate(
            id=generate_id(),
            latitude=fp["lat"],
            longitude=fp["lon"],
            poi_type=(
                FixedPoiType.FOUNTAIN.value if "poiType" not in fp
                else fp["poiType"]
            ),
            icon_url=fp["icon_url"]
        )
        for fp in parse_drinking_water() + parse_fixed_pois()
    ]
    crud.create_fixed_pois(db, db_drinking_water)
    user_pois = [
        schemas.PoiCreate(**up, id=generate_id())
        for up in parse_user_pois()
    ]
    crud.create_pois(db, user_pois)
