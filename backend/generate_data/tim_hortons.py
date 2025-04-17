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
        "name": f"Tim Hortons {location}",
        "location": location,
        "image": "https://rickie-austin-114.github.io/restaurants/tim_hortons.jpg",
        "price": 40 + random.randint(1, 100),
        "description": "Tim Hortons is a popular Canadian coffee shop and fast-food chain, known for its rich coffee, delicious donuts, and a variety of breakfast and lunch items. With a focus on community and quality, it offers a cozy atmosphere for friends and families to gather, making it a beloved staple across Canada.",    }

    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)