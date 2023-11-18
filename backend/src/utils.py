from src.data.sources.parsing import parse_drinking_water
from src.fixed_pois.models import FixedPoiType
from src.data.db import database, crud, schemas

db = next(database.get_db())


def populate_db():
    drinking_water = parse_drinking_water()
    db_drinking_water = [
        schemas.FixedPoiCreate(
            latitude=dw[0],
            longitude=dw[1],
            poi_type=FixedPoiType.FOUNTAIN.value
        )
        for dw in drinking_water
    ]
    crud.create_fixed_poi_bulk(db, db_drinking_water)
