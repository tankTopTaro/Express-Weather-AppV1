const express = require('express');
const https = require('https')
const app = express();

app.listen(3000, function () {  
    console.log('server is running on port 3000...');
});

// app.use(express.static('public'));


// API CALL: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

app.get('/', (req, res)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=CALAPAN&appid=d871f7208e65caf916aac8be8dce0be6&units=metric';

    https.get(url, function(response){
        // console.log(response.statusCode);
        // console.log(response.headers);

        response.on('data', (d) => {
            const weatherData = JSON.parse(d);

            // console.log(weatherData);
            const city = weatherData.name;
            const country = weatherData.sys.country;
            const temp = weatherData.main.temp;
            const currentWeather = weatherData.weather[0].description;

            res.send("<h1>The current weather in " + city + ', ' + country + ' is ' + currentWeather + ' with the temperature at ' + temp + ' degrees Celsius.</h1>');
        })
    });

    // res.send("server is up and running")
})


