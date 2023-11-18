import json
import datetime
from datetime import date
from random import randrange
from pathlib import Path


def read_cells():
    current_dir =  Path(__file__).parent.resolve()
    with open(current_dir / "../data/sources/bright_sky_munich.json", "r") as f:
        data = json.load(f)
    return data


def generate_alert():
    start = datetime.datetime.now() + datetime.timedelta(days=randrange(start = -2, stop = 1),
                                                         hours=randrange(start = -5, stop = 7),
                                                         minutes=randrange(start = -5, stop = 7))

    end  = datetime.datetime.now() + datetime.timedelta(days=randrange (start = 1, stop = 4),
                                             hours=randrange(start = -5, stop = 7),
                                             minutes=randrange(start = -5, stop = 7))

    categories = ['heat wave', 'rain', 'wind Gusts']
    category = categories[randrange(start=0, stop = len(categories))]
    severities = ['strong', 'extreme']
    severity_level = randrange(start=3, stop = 5)
    severity = severities[severity_level - 3]
    description = f"This is official warning for {severity} {category} (level {severity_level} of 4) starting on {start.strftime('%d/%m/%Y %H:%M:%S')} until {end.strftime('%d/%m/%Y %H:%M:%S')}!!"

    alert = {
        'effective': start,
        'expires' : end,
        'category': category,
        'severity': severity,
        'description': description
    }
    return alert


def generate_oktoberfest():
    alert = {
        'effective': datetime.now(),
        'expires': datetime.now() + datetime.timedelta(days=16),
        'category': 'Beer',
        'severity': 'extreme',
        'description': 'This is official warning of drunk sightings all over the city'
    }
    return alert
