const express = require('express');
const https = require('https')
const app = express();

app.listen(3000, function () {  
    console.log('server is running on port 3000...');
});

// app.use(express.static('public'));


// API CALL: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//
app.get('/', (req, res)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=CALAPAN&&units=metric';

    https.get(url, function(response){
        // console.log(response.statusCode);
        // console.log(response.headers);

        response.on('data', (d) => {
            const weatherData = JSON.parse(d);

            // console.log(weatherData);

            console.log("City: " + weatherData.name + ', ' + weatherData.sys.country);
            console.log('Temp: ' + weatherData.main.temp + ' Celsius');
            console.log('Weather: ' + weatherData.weather[0].description);
        })
    });

    res.send("server is up and running")
})


