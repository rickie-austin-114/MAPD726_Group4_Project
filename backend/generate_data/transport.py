import requests
import json
import random

# Define the URL
url = 'https://ninth-rhino-450106-u8.df.r.appspot.com/api/transports'



# Create the payload as a dictionary
payloads = [

    {
    "name": "Air Canada",
    "price": 300,
    "image": "https://rickie-austin-114.github.io/assets/air_canada.png",
    "speed": 900,
    "ratings": 5,
    "category": "Plane",
    "description" : "Air Canada is the country's largest airline, offering a comprehensive network of domestic and international flights. Known for quality service, it provides travelers with a comfortable and reliable flying experience."
},
{
    "name": "Westjet",
    "price": 250,
    "image": "https://rickie-austin-114.github.io/assets/westjet.png",
    "speed": 900,
    "ratings": 4,
    "category": "Plane",
    "description" :"WestJet is a Canadian airline known for its friendly service and affordable fares. Offering a range of domestic and international flights, it ensures a pleasant travel experience for all passengers."
    },
{
    "name": "Air transat",
    "price": 200,
    "image": "https://rickie-austin-114.github.io/assets/air_transat.png",
    "speed": 900,
    "ratings": 3,
    "category": "Plane",
    "description" :"Air Transat is a Canadian airline specializing in leisure travel. It offers affordable flights to popular vacation destinations, providing excellent service and comfort for travelers seeking memorable holiday experiences."  },
{
    "name": "United Airlines",
    "price": 300,
    "image": "https://rickie-austin-114.github.io/assets/united.png",
    "speed": 900,
    "ratings": 4,
    "category": "Plane",
    "description" :"United Airlines offers extensive domestic and international flights, providing travelers with reliable service, modern amenities, and a commitment to customer satisfaction, ensuring a comfortable journey to various destinations worldwide."
},
{
    "name": "American Airlines",
    "price": 250,
    "image": "https://rickie-austin-114.github.io/assets/american_airlines.webp",
    "speed": 900,
    "ratings": 3,
    "category": "Plane",
    "description" :"American Airlines is a major global airline, known for its extensive network, exceptional service, and modern fleet. It connects travelers to a wide range of destinations across the globe."
},
{
    "name": "Delta Airlines",
    "price": 350,
    "image": "https://rickie-austin-114.github.io/assets/delta.webp",
    "speed": 900,
    "ratings": 5,
    "category": "Plane",
    "description" :"Delta Airlines is a leading global airline, renowned for its extensive route network, customer service, and modern fleet. It offers travelers a comfortable experience and connects major destinations worldwide."
    },
{
    "name": "Flixbus",
    "price": 100,
    "image": "https://rickie-austin-114.github.io/assets/flixbus.png",
    "speed": 100,
    "ratings": 2,
    "category": "Bus",
    "description" :"FlixBus is a leading intercity bus service in Europe and North America, offering affordable and convenient travel. With extensive routes, modern buses, and onboard amenities, it ensures a comfortable journey." 
},
{
    "name": "Greyhound",
    "price": 120,
    "image": "https://rickie-austin-114.github.io/assets/greyhound.png",
    "speed": 100,
    "ratings": 3,
    "category": "Bus",
    "description" :"Greyhound is a well-known intercity bus service in North America, offering affordable travel options across the continent. With extensive routes and comfortable seating, it connects travelers to various destinations conveniently."
},
{
    "name": "Megabus",
    "price": 140,
    "image": "https://rickie-austin-114.github.io/assets/megabus.webp",
    "speed": 100,
    "ratings": 4,
    "category": "Bus",
    "description" :"Megabus provides affordable intercity bus travel across North America and Europe, featuring comfortable seating and free Wi-Fi. Known for its convenient routes, it offers an economical way to explore cities."
},
]


for payload in payloads:
# Send the POST request
    response = requests.post(url, json=payload)

    # Check the response
    if response.status_code == 201:
        print('Success:', response.json())
    else:
        print('Error:', response.status_code, response.text)