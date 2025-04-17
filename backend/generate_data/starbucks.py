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
        "name": f"Starbucks {location}",
        "location": location,
        "image": "https://rickie-austin-114.github.io/restaurants/starbucks.png",
        "price": 50 + random.randint(1, 100),
        "description": "Starbucks is a renowned coffeehouse chain that specializes in high-quality coffee, espresso beverages, and teas. Established in 1971, it offers a cozy atmosphere for customers to enjoy their drinks. With a focus on sustainability and community, Starbucks also features a variety of pastries and snacks to complement its beverages.",
    }

    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)