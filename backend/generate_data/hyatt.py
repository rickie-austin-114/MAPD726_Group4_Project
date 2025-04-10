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
        "name": f"Hyatt Hotel {location}",
        "location": location,
        "description": "Hyatt Hotels provide a luxurious and comfortable experience for travelers worldwide. Known for their exceptional service and modern accommodations, Hyatt offers diverse dining options and state-of-the-art amenities. Whether for business or leisure, guests enjoy a welcoming atmosphere and convenient locations, making every stay memorable and enjoyable across various destinations.",
            "price": 100 + random.randint(1, 100),
        "image": "https://rickie-austin-114.github.io/assets/hyatt.jpg" }

    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)

