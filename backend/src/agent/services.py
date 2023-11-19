from data.db.database import get_db
from data.db.crud import get_all_pois
from bright_sky.services import generate_alert
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


def get_chatgpt_info():
    current_weather = "Its 25°C, cloudy, and quite windy."
    db = next(get_db())
    weather_warnings = generate_alert()
    pois = get_all_pois(db)
    pois_as_str = "\n".join([str(poi) for poi in pois])
    data_as_str = """
    Current weather: {current_weather}
    Weather warnings: {weather_warnings}
    POIs: {pois}
    """.format(current_weather=current_weather, weather_warnings=weather_warnings, pois=pois_as_str)
    return data_as_str
