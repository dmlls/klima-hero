import json
from pathlib import Path
from typing import Dict, List, Tuple

from src.icons import icons
from src.pois.models import PoiRequest


def parse_drinking_water() -> List[dict]:
    current_dir =  Path(__file__).parent.resolve()
    with open(current_dir / "drinking_water.json", "r", encoding="utf-8") as f:
        parsed = json.load(f)
    return [
        {
            "lat": element["lat"],
            "lon": element["lon"],
            "icon_url": icons["Fountain"]
        }
        for element in parsed["elements"]
    ]


def parse_user_pois() -> List[dict]:
    current_dir =  Path(__file__).parent.resolve()
    with open(current_dir / "user_pois.json", "r", encoding="utf-8") as f:
        parsed = json.load(f)
    return [{"icon_url": icons["Flood"], **element} for element in parsed]
