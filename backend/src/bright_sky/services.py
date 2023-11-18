import json
import os
from datetime import date
import datetime
from random import randrange

def read_cells():
    script_dir = os.path.dirname(__file__)
    rel_path = "../data/bright_sky/warning_cells_munich.json"
    file_path = os.path.join(script_dir, rel_path)
    with open(file_path, "r") as f:
        data = json.load(f)
    return data

def generate_alert():
    start = datetime.datetime.now() + datetime.timedelta(days=randrange(start = -2, stop = 1),
                                                         hours = randrange(start = -5, stop = 7),
                                                         minutes = randrange(start = -5, stop = 7))
    
    end  = datetime.datetime.now() + datetime.timedelta(days=randrange (start = 1, stop = 4),
                                             hours = randrange(start = -5, stop = 7),
                                             minutes = randrange(start = -5, stop = 7))
    
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
        'effective': date.today(),
        'expires' : date.today() + datetime.timedelta(days=16),
        'category': 'Beer',
        'severity': 'extreme',
        'description': 'This is official wanrning of drunk sightings all over the city'
    }
    
    return alert
