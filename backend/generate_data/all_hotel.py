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
        "name": f"Day Inns Hotel {location}",
        "location": location,
        "description":"Day Inn Hotels offer affordable comfort and convenience for travelers seeking a pleasant stay. With cozy accommodations, essential amenities, and a welcoming atmosphere, guests can enjoy restful nights and easy access to local attractions. Ideal for families and business travelers alike, Day Inn ensures a budget-friendly and enjoyable experience.",
        "price": 100 + random.randint(1, 100),
        "image": "https://rickie-austin-114.github.io/assets/wyndham.jpg" }

    # Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)

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