import casefy
from pydantic import BaseModel


class CamelModel(BaseModel):
    class Config:
        alias_generator = casefy.camelcase
        allow_population_by_field_name = True
