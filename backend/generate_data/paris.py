import requests
import json
import random

# Define the URL
url = 'https://ninth-rhino-450106-u8.df.r.appspot.com/api/mappoints'

data = [
    {
      "name": "Eiffel Tower",
      "description": "Iconic iron tower",
      "latitude": 48.8584,
      "longitude": 2.2945
    },
    {
      "name": "Louvre Museum",
      "description": "World's largest art museum",
      "latitude": 48.8606,
      "longitude": 2.3376
    },
    {
      "name": "Notre-Dame Cathedral",
      "description": "Medieval Catholic cathedral",
      "latitude": 48.8530,
      "longitude": 2.3499
    },
    {
      "name": "Arc de Triomphe",
      "description": "Triumphal arch",
      "latitude": 48.8738,
      "longitude": 2.2950
    },
    {
      "name": "Montmartre",
      "description": "Historic artists' district",
      "latitude": 48.8867,
      "longitude": 2.3431
    }
]

for item in data:

    payload = item

    payload["location"] = "Paris"

    
    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)