import requests
import json
import random

# Define the URL
url = 'https://ninth-rhino-450106-u8.df.r.appspot.com/api/restaurants'

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
        "name": f"Mcdonald's {location}",
        "location": location,
        "description": "McDonald's is a global fast-food chain known for its iconic burgers, fries, and breakfast items. Founded in 1940, it offers a diverse menu catering to various tastes, including healthier options. With a commitment to quality and convenience, McDonald's serves millions daily in vibrant, welcoming environments around the world.",
        "price": 100 + random.randint(1, 100),
        "image": "https://rickie-austin-114.github.io/restaurants/mcdonalds.png" }

    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)