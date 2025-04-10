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
        "name": f"Hilton Hotel {location}",
        "location": location,
        "description": "Hilton Hotels provide a welcoming blend of comfort and convenience for travelers. With luxurious accommodations, exceptional service, and diverse dining options, guests can relax and unwind. Offering modern amenities and flexible event spaces, Hilton caters to both leisure and business travelers, ensuring a memorable experience in prime locations worldwide.",
        
        "price": 400 + random.randint(1, 100),
        "image": "https://rickie-austin-114.github.io/assets/hilton.jpg"
    }

    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)