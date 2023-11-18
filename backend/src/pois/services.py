from models import Poi
from typing import List
from geopy.distance import geodesic
import numpy as np

def get_closest_pois(long, lat, top_k=5):
    # TODO: get the poise BOI
    pois = None
    distances = [geodesic((long, lat), (poi.long, poi.lat)).meters for poi in pois]
    sorted_indexes = np.argsort(distances)
    return [pois[i] for i in sorted_indexes][:top_k]