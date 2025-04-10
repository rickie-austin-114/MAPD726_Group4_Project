import requests
import json
import random

# Define the URL
url = 'https://ninth-rhino-450106-u8.df.r.appspot.com/api/hotels'

locations = [
    "Tokyo",
    "Bangkok",
    "Bali",
    "Seoul",
    "Cancun",
    "Rio de Janeiro",
    "New York City",
    "Montreal",
    "Venice",
    "Copenhagen",
    "London",
    "Paris"
]

for location in locations:

    # Create the payload as a dictionary
    payload = {
        "name": f"Marriot Hotel {location}",
        "location": location,
        "description":"Marriott Hotels offer a blend of luxury and comfort, providing exceptional accommodations worldwide. Guests enjoy modern amenities, fine dining, and outstanding service in stylish settings. With a focus on business and leisure travelers, Marriott ensures a memorable stay, featuring spacious rooms, fitness centers, and convenient locations near major attractions.",
        "price": 300 + random.randint(1, 100),
        "image": "https://cache.marriott.com/content/dam/marriott-renditions/YYZMR/yyzmr-lobby-0019-hor-wide.jpg"
    }

    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)