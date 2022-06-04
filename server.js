const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();


app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));


app.get('/', (req, res) => {
    console.log('Root route working');
    res.render('index');
})


app.get('/api/geo/:city/:country', async (req, res) => {
    const city = req.params.city;
    const country = req.params.country;
    const coordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${process.env.OPEN_WEATHER_API_KEY}`;


    async function fetchCoordApi(url) {
        console.log('fetchCoordApi() function');

        const response = await fetch(url);
        const arr = await response.json();
        const obj = arr[0];

        return JSON.stringify(obj);
    }

    const sendObj = await fetchCoordApi(coordUrl);

    return res.send(sendObj);
})


app.get('/api/geo/:city/:state/:country', async (req, res) => {
    const city = req.params.city;
    const state = req.params.state;
    const country = req.params.country;
    const coordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${process.env.OPEN_WEATHER_API_KEY}`;


    async function fetchCoordApi(url) {
        console.log('fetchCoordApi() function');

        const response = await fetch(url);
        const arr = await response.json();
        const obj = arr[0];

        return JSON.stringify(obj);
    }

    const sendObj = await fetchCoordApi(coordUrl);

    return res.send(sendObj);
})


app.get('/api/weather/:lat/:lon', async (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;


    async function fetchWeatherApi(url) {
        console.log('fetchWeatherApi() function')

        const response = await fetch(url);
        const object = await response.json();

        console.log('SCRIPT 63');
        console.log(response);
        console.log(object);

        return JSON.stringify(object);
    }

    const weatherObj = await fetchWeatherApi(weatherUrl);

    return res.send(weatherObj);
})



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
