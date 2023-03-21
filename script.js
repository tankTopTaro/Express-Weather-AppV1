const express = require('express');
const https = require('https')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "//public/index.html");
})

app.post('/', (req, res)=>{
    // console.log(req.body.city);

    const query = req.body.city;
    const units = 'metric';
    const appKey = 'd871f7208e65caf916aac8be8dce0be6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appKey}&units=${units}`;

    https.get(url, function(response){
        response.on('data', (d) => {
            const weatherData = JSON.parse(d);
            const city = weatherData.name;
            const country = weatherData.sys.country;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const currentWeather = weatherData.weather[0].description;

            const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            res.setHeader('Content-type', "text/html")
            res.write('<header><div class="header"></div></header>');
            res.write('<h1>The current weather in ' + city + ', ' + country + ' is <img src="' + iconURL + '"> ' + currentWeather + '.</h1>');
            res.write('<h2>With the temperature at ' + temp + ' degrees Celsius.</h2>');
            res.send();
        });
    });
})

app.listen(3000, function () {  
    console.log('server is running on port 3000...');
});

// app.use(express.static('public'));


// API CALL: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

/*app.get('/', (req, res)=>{
    
    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=CALAPAN&appid=d871f7208e65caf916aac8be8dce0be6&units=metric';
    // const query = 'Cainta';
    // const units = 'metric';
    // const appKey = 'd871f7208e65caf916aac8be8dce0be6';
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appKey}&units=${units}`;


    https.get(url, function(response){
        // console.log(response.statusCode);
        // console.log(response.headers);

        response.on('data', (d) => {
            const weatherData = JSON.parse(d);
            
            // console.log(weatherData);
            const city = weatherData.name;
            const country = weatherData.sys.country;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const currentWeather = weatherData.weather[0].description;

            const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            // const iconURL1 = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

            // res.send("<h1>The current weather in " + city + ', ' + country + ' is ' + currentWeather + ' with the temperature at ' + temp + ' degrees Celsius.</h1>');
            res.write('<h1>The current weather in ' + city + ', ' + country + ' is <img src="' + iconURL + '"> ' + currentWeather + '.</h1>');
            res.write('<h2>With the temperature at ' + temp + ' degrees Celsius.</h2>');
            // res.write("<img src='" + iconURL1 + "'>");
            res.send();
        });
    });

    // res.send("server is up and running")
})*/


