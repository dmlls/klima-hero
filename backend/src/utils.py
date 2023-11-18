from src.data.sources.parsing import parse_drinking_water, parse_user_pois
from src.fixed_pois.models import FixedPoiType
from src.data.db import database, crud, schemas

db = next(database.get_db())


def populate_db():
    db_drinking_water = [
        schemas.FixedPoiCreate(
            latitude=dw[0],
            longitude=dw[1],
            poi_type=FixedPoiType.FOUNTAIN.value
        )
        for dw in parse_drinking_water()
    ]
    crud.create_fixed_pois(db, db_drinking_water)
    user_pois = [
        schemas.PoiCreate(**up.dict())
        for up in parse_user_pois()
    ]
    crud.create_pois(db, user_pois)
