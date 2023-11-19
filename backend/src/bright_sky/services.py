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

def warning_cells():
    current_dir =  Path(__file__).parent.resolve()
    with open(current_dir / "../data/sources/south_munich_cells.json", "r") as f:
        data = json.load(f)
    return data


def generate_alert():
    # start = datetime.datetime.now() + datetime.timedelta(days=randrange(start = -2, stop = 1),
    #                                                      hours=randrange(start = -5, stop = 7),
    #                                                      minutes=randrange(start = -5, stop = 7))

    start = datetime.datetime.now() + datetime.timedelta(hours=randrange(start = -7, stop = -1),
                                                         minutes=randrange(start = -5, stop = 7))    

    end  = datetime.datetime.now() + datetime.timedelta(days=randrange (start = 1, stop = 3),
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
        'category': 'Storm',
        'severity': 'Extreme',
        'description': f"This is an official warning for an extreme storm (level 4 of 4) affecting the following areas starting on {start.strftime('%d/%m/%Y %H:%M:%S')} until {end.strftime('%d/%m/%Y %H:%M:%S')}!!"
    }
    return alert


def generate_oktoberfest():
    alert = {
        'effective': datetime.datetime.now(),
        'expires': datetime.datetime.now() + datetime.timedelta(days=16),
        'category': 'Beer',
        'severity': 'extreme',
        'description': 'This is official warning of drunk sightings all over the city'
    }
    return alert
