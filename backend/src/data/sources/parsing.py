import json
from pathlib import Path
from typing import Dict, List, Tuple

from src.icons import icons

current_dir =  Path(__file__).parent.resolve()


def parse_drinking_water() -> List[dict]:
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
    with open(current_dir / "user_pois.json", "r", encoding="utf-8") as f:
        parsed = json.load(f)
    return [{"icon_url": icons[element["poiType"]], **element} for element in parsed]


def parse_fixed_pois() -> List[dict]:
    with open(current_dir / "fixed_pois.json", "r", encoding="utf-8") as f:
        parsed = json.load(f)
    return [{"icon_url": icons[element["poiType"]], **element} for element in parsed]
