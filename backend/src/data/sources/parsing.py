import json
from pathlib import Path
from typing import List, Tuple


def parse_drinking_water() -> List[Tuple[float, float]]:
    current_dir =  Path(__file__).parent.resolve()
    with open(current_dir / "drinking_water.json", "r", encoding="utf-8") as f:
        parsed = json.load(f)
    return [
        (element["lat"], element["lon"])
        for element in parsed["elements"]
    ]
