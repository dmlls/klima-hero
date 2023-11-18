from datetime import datetime
from enum import Enum
from pydantic import conint
from typing import List
from src.base_model import CamelModel

class GetDailyUpdateRequest(CamelModel):
    pass

class GetDailyUpdateResponse(CamelModel):
    msg: str
