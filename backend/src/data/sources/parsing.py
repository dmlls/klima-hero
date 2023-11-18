import json
from pathlib import Path
from typing import List, Tuple

from src.pois.models import PoiRequest


def parse_drinking_water() -> List[Tuple[float, float]]:
    current_dir =  Path(__file__).parent.resolve()
    with open(current_dir / "drinking_water.json", "r", encoding="utf-8") as f:
        parsed = json.load(f)
    return [
        (element["lat"], element["lon"])
        for element in parsed["elements"]
    ]


def parse_user_pois() -> List[PoiRequest]:
    current_dir =  Path(__file__).parent.resolve()
    with open(current_dir / "user_pois.json", "r", encoding="utf-8") as f:
        parsed = json.load(f)
    return [PoiRequest(**element) for element in parsed]
