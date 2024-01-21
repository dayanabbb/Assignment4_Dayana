# Dayana's weather forecast

## Introduction
Welcome to Dayana's Weather Forecast App! This application provides current weather information and additional data for a given city.


## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `node app.js` to start the server
4. Open your browser and go to http://localhost:3000

## Dependencies
- Express: Fast, unopinionated, minimalist web framework for Node.js.
- HTTPS: Secure, robust, and essential package for enabling secure communication over the web in Node.js applications.

## Server
The server runs on port 3000.


## API's used
1.Google Maps Geocoding API:

Endpoint: https://maps.googleapis.com/maps/api/geocode/json
Usage: Converts a city name to latitude and longitude.

2.NASA API:

Endpoint: https://api.nasa.gov/planetary/apod
Usage: Retrieves NASA's Astronomy Picture of the Day.

3.OpenWeatherMap API:

Endpoint: https://api.openweathermap.org/data/2.5/weather
Usage: Gets current weather details for a specific city.

## Usage
1.Input the city name
2.Click the "Get Current Weather" button.
3.See the results.




