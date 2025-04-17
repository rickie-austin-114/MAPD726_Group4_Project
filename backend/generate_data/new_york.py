import requests
import json
import random

# Define the URL
url = 'https://ninth-rhino-450106-u8.df.r.appspot.com/api/mappoints'

data = [
    {
      "name": "Central Park",
      "description": "Beautiful Park",
      "latitude": 40.782717073594696, 
      "longitude": -73.96534738982433
    },
    {
      "name": "The Museum of Modren Art",
      "description": "United States's largest art museum",
      "latitude": 40.76179773305039, 
      "longitude":-73.9712028640507
    },
    {
      "name": "Empire State Building",
      "description": "Landmark of New York",
      "latitude": 40.749954562410466, 
      "longitude": -73.98541580599489
    },
    {
      "name": "Charging Bull of New York Stock Exchange",
      "description": "Symbol of bull market ",
      "latitude": 40.70584770333771, 
      "longitude": -74.0134389696008
    },
    {
      "name": "Statue of Liberty",
      "description": "Symbol of Democracy",
      "latitude": 40.69006716723812, 
      "longitude": -74.0440842243019
    }
]

for item in data:

    payload = item

    payload["location"] = "New York City"

    
    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)