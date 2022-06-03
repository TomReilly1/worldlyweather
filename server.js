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

app.get('/api/:city/:country', async (req, res) => {
    res.header("Content-Type",'application/json');
    // console.log(req);
    // console.log(res);
    const city = req.params.city;
    const country = req.params.country;
    console.log(city);
    console.log(country);
    

    const coordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

    console.log(coordUrl);

    async function getCordinates(url) {
        const response = await fetch(url);
        const arr = await response.json();
        const obj = arr[0];
        const lat = obj['lat'];
        const lon = obj['lon'];

        console.log('SCRIPT 40\n' + JSON.stringify(obj));

        return JSON.stringify(obj);
    }



    const sendObj = await getCordinates(coordUrl);
    
    // await console.log('SENDOBJ 48\n' + sendObj);

    // for (let i in sendObj) {
    //     console.log(i + ': ' + sendObj[i]);
    // }

    res.send(sendObj);



    // const coordinates = fetch(coordUrl)
    // .then((response) => response.json())
    // .then((data) => {
    //     return data;
    // });
  
    // const sendCoord = () => {
    //     coordinates.then((a) => {
    //         console.log(a);

    //     });
    // };
    
    // sendCoord();
  



})

app.get('/api/:city/:state/:country', (req, res) => {
    // console.log(req);
    // console.log(res);
    res.send('Got a POST request')
    // console.log(`http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},${countryVal}&appid=${geoApiKey}`);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
