from sqlalchemy import (Boolean, Column, ForeignKey, Integer, String, Float,
    DateTime, CheckConstraint)
from sqlalchemy.orm import relationship

from .database import Base
from src.pois.models import PoiType
from src.fixed_pois.models import FixedPoiType


class FixedPoi(Base):
    __tablename__ = "fixed_pois"

    id = Column(String, primary_key=True, index=True)
    latitude = Column(Float, index=True)
    longitude = Column(Float, index=True)
    poi_type = Column(String, CheckConstraint(
        f"poi_type IN ({','.join(repr(poi_type.value) for poi_type in FixedPoiType)})"))
    icon_url = Column(String)


class Poi(Base):
    __tablename__ = "pois"

    id = Column(String, primary_key=True, index=True)
    latitude = Column(Float, index=True)
    longitude = Column(Float, index=True)
    poi_type = Column(String, CheckConstraint(
        f"poi_type IN ({','.join(repr(poi_type.value) for poi_type in PoiType)})"))
    thread = relationship("ThreadMessage")
    upvotes = Column(Integer, CheckConstraint("upvotes>=0"))
    creation_date = Column(DateTime)
    related_event = Column(String)
    official = Column(Boolean)
    active = Column(Boolean)
    icon_url = Column(String)


class ThreadMessage(Base):
    __tablename__ = "thread_messages"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String)
    content = Column(String)
    creation_date = Column(DateTime)
    poi_id = Column(Integer, ForeignKey("pois.id"))
    poi = relationship("Poi", back_populates="thread")
