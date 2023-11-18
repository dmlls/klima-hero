import os
import numpy as np
from fastapi import APIRouter, status
from .models import GetDailyUpdateResponse
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv('src/.env')
OPENAI_KEY = os.getenv("OPENAI_KEY")

router = APIRouter()
request_template = """
As an AI assistant tailored for an application aiding individuals during extreme weather conditions like heatwaves, heavy rain, floods, or storms, your role is to provide a daily summary based on the information provied below. Each day, if there is anything worth mentioning, the user will be greeted by you. Your task is to present a clear and succinct summary to inform the user about the current situation. Use bullet points if adequate. Only utilize the provided information. Do not incorporate external information or fabricate details.

Here is all the information that is relevant for the user on this day:
{data_points}
"""

NO_EVENT_MESSAGES = [
    "Have a great day!",
    "Nothing to worry about!",
    "Everything is on track!",
    "All is well! Enjoy your day!",
    "There should be no issues today!",
]

# current weather -> from peter
# weather warnings -> from peter
# incidents nearby -> get from diego

@router.get("/daily-update", status_code=status.HTTP_200_OK, response_model=GetDailyUpdateResponse)
def get_daily_update_view():
    client = OpenAI(api_key=OPENAI_KEY)
    data_points_as_string = ""
    if data_points_as_string != "":
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": request_template.format(data_points=data_points_as_string)},
                {"role": "user", "content": "What is my daily update? Is there anything worth mentioning?"}
            ]
        )
        response = response.choices[0].message.content
    else:
        response = NO_EVENT_MESSAGES[np.random.randint(0, len(NO_EVENT_MESSAGES))]
    return GetDailyUpdateResponse(msg=response)


