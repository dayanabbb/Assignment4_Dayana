const express = require("express");
const https = require("https");
const app = express();

//I used two additional API's such as Google Maps Geocoding API and NASA API
const googleMapsApiKey = 'AIzaSyBljJnmtAIBqTq52QZJJWFelE1giDRpQaw';
const nasaApiKey = 'dbXXfS9EwCtDkpK224fYAiqreiNLy2aXQJcdsECQ';

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html"); 
});

app.get("/location", function(req, res) {
    const query = req.query.city;

    //using google maps geocoding api to get latitude and longitude
    const mapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${googleMapsApiKey}`;

    https.get(mapUrl, function(response) {
        let data = " ";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            const locationData = JSON.parse(data);
            const location = locationData.results[0].geometry.location;

            // sending it to the front end
            res.send({
                latitude: location.lat,
                longitude: location.lng
            });
        });
    });
});


app.get("/extra-data", function(req, res) {
    
    const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

    https.get(nasaApiUrl, function(response) {
        let data = " ";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            const nasaData = JSON.parse(data);

            
            res.send({
                nasaData: nasaData
            });
        });
    });
});

app.get("/weather", function(req, res) {
    const query = req.query.city;
    const openWeatherApiKey = '67f9691854657c1c5e8f7c2918fb60b1'; 
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${openWeatherApiKey}&units=${unit}`;
    https.get(url, function(response) {
        let data = " ";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            const weatherData = JSON.parse(data);

            
            const cityName = weatherData.name;
            const temp = weatherData.main.temp;
            const feels = weatherData.main.feels_like;
            const description = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const wind = weatherData.wind.speed;
            const pressure = weatherData.main.pressure;
            const code = weatherData.cod;
            const lon = weatherData.coord.lon;
            const lat = weatherData.coord.lat;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            
            /*res.send(`
                <h2>${cityName}'s country code is ${code} (longitude: ${lon} , latitude: ${lat})</h2>
                <p>Current temperature is: ${temp}°C<p>
                <p>The weather is currently ${description}</p>
                <p>The temperature feels like ${feels}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind speed is: ${wind} m/s</p>
                <p>Pressure is: ${pressure} hPa</p>
                <img src="${imageURL}" alt="weather icon">
            `);

            */

            res.send(`
            <body style="background-color: #d3d3d3;">
            <h2 class="card-title">${cityName}'s country code is ${code} (longitude: ${lon} , latitude: ${lat})</h2>
                <div class="card" style="color: #000; margin: 20px; display: flex; flex-wrap: wrap;">
                

                    
    
                    <div class="card" style="color: #000; margin: 20px; flex: 1;">
                        <div class="card-body">
                            <h5 class="card-title">Current temperature</h5>
                            <p class="card-text">${temp}°C</p>
                        </div>
                    </div>
    
                    <div class="card" style="color: #000; margin: 20px; flex: 1;">
                        <div class="card-body">
                            <h5 class="card-title">Weather description</h5>
                            <p class="card-text">${description}</p>
                        </div>
                    </div>
    
                    <div class="card" style="color: #000; margin: 20px; flex: 1;">
                        <div class="card-body">
                            <h5 class="card-title">Feels like</h5>
                            <p class="card-text">${feels}°C</p>
                        </div>
                    </div>
    
                    <div class="card" style="color: #000; margin: 20px; flex: 1;">
                        <div class="card-body">
                            <h5 class="card-title">Humidity</h5>
                            <p class="card-text">${humidity}%</p>
                        </div>
                    </div>
    
                    <div class="card" style="color: #000; margin: 20px; flex: 1;">
                        <div class="card-body">
                            <h5 class="card-title">Wind speed</h5>
                            <p class="card-text">${wind} m/s</p>
                        </div>
                    </div>
    
                    <div class="card" style="color: #000; margin: 20px; flex: 1;">
                        <div class="card-body">
                            <h5 class="card-title">Pressure</h5>
                            <p class="card-text">${pressure} hPa</p>
                        </div>
                    </div>

                    <div class="card" style="color: #000; margin: 20px; flex: 1;">
                        <div class="card-body">
                            
                            <img src="${imageURL}" alt="weather icon" style="max-width: 100%; margin: 20px;"> 
                        </div>
                    </div>


                </div>

                <div id="map-container" class="card" style="flex: 2; height: 300px; margin: 20px;"></div>
    
                
            </body>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBljJnmtAIBqTq52QZJJWFelE1giDRpQaw&callback=initMap" async defer></script>
                <script src="/map.js"></script>
                <script>
    // Call the initMap function after the page loads
    window.onload = function() {
        // Check if lat and lon are valid numbers before calling initMap
        if (!isNaN(${lat}) && !isNaN(${lon})) {
            initMap(${lat}, ${lon});
        } else {
            console.error("Invalid latitude or longitude values.");
        }
    };
</script>
        `);
        });
    });
});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});
