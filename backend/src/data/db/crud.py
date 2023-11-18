from sqlalchemy.orm import Session

from . import models, schemas


def create_poi(db: Session, poi: schemas.PoiCreate):
    db_poi = models.Poi(
        latitude=poi.latitude,
        longitude=poi.longitude,
        poi_type=poi.poi_type.value,
        upvotes=poi.upvotes,
        creation_date=poi.creation_date,
        related_event=poi.related_event,
        official=poi.official,
        active=poi.active
    )
    db.add(db_poi)
    db.commit()
    db.refresh(db_poi)
    for message in poi.thread:
        db_message = models.ThreadMessage(**message.dict(), poi_id=db_poi.id)
        db.add(db_message)
    db.commit()


def update_poi(db: Session, id_: str, poi: schemas.PoiCreate):
    id_ = int(id_)
    db.query(models.Poi).filter(models.Poi.id == id_).update(
        {
            "latitude": poi.latitude,
            "longitude": poi.longitude,
            "poi_type": poi.poi_type.value,
            "upvotes": poi.upvotes,
            "creation_date": poi.creation_date,
            "related_event": poi.related_event,
            "official": poi.official,
            "active": poi.active
        }
    )
    db.query(models.ThreadMessage).filter(models.ThreadMessage.poi_id == id_).delete()
    for message in poi.thread:
        db_message = models.ThreadMessage(**message.dict(), poi_id=id_)
        db.add(db_message)
    db.commit()


def get_poi(db: Session, id_: int):
    return db.query(models.Poi).filter(models.Poi.id == id_).first()


def get_all_pois(db: Session, skip: int = 0, limit: int = 9999):
    return db.query(models.Poi).offset(skip).limit(limit).all()
