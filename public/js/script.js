const cityInputElem = document.getElementById('city');
const countrySelElem = document.getElementById('countries');
const stateSelElem = document.getElementById('states');
const submitBtnElem = document.getElementById('submit-btn');
const geoApiKey = 'OPEN_WEATHER_API_KEY';



async function getCodes(url) {
    const response = await fetch(url);
    return response.json();
}

async function getCoordinates(url) {
    console.log('getCoordinates() function');

    const res = await fetch(url);
    const obj = await res.json();
    const lat = await obj['lat'];
    const lon = await obj['lon'];

    getWeather(lat, lon);
}

async function getWeather(lat, lon) {
    console.log('getWeather() function');

    const res = await fetch(`http://localhost:3333/api/weather/${lat}/${lon}`);
    const obj = await res.json();

    generateWeatherElements(obj);
}



function fillSelectElements(elemId, codeList) {
    const selectElem = document.getElementById(elemId);

    for (let i of codeList) {
        const optionElem = document.createElement('option');
        optionElem.value = i['code'];
        optionElem.textContent = i['name'];
        selectElem.appendChild(optionElem);
    }
}

function generateWeatherElements(obj) {
    const cityName = obj['name'];
    const latitude = obj['coord']['lat'];
    const longitude = obj['coord']['lon'];
    const weatherDesc = obj['weather'][0]['description'];
    const temperature = obj['main']['temp'];
    const feelsLikeTemp = obj['main']['feels_like'];
    const icon = obj['weather'][0]['icon'];
    const cloudCoverage = obj['clouds']['all'];
    const humidity = obj['main']['humidity'];
    const windSpeed = obj['wind']['speed'];

    document.getElementById('result-city').textContent = cityName;
    document.getElementById('result-coord').textContent = `${latitude},${longitude}`;
    document.getElementById('result-desc').textContent = weatherDesc;
    document.getElementById('result-temp').textContent = temperature + ' \xB0F';
    document.getElementById('result-feels-like').textContent = 'Feels like ' + feelsLikeTemp + ' \xB0F';
    document.getElementById('result-img').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById('result-cloud-cover').textContent = cloudCoverage + '%';
    document.getElementById('result-humidity').textContent = humidity + '%';
    document.getElementById('result-wind-speed').textContent = windSpeed + ' mph';
}



function main() {
    getCodes('./json/countries.json')
    .then(data => {
        fillSelectElements('countries', data);
    });

    getCodes('./json/states.json')
    .then(data => {
        fillSelectElements('states', data);
    });


    countrySelElem.addEventListener('change', () => {
        if (countrySelElem.options[countrySelElem.selectedIndex].value === 'US') {
            stateSelElem.disabled = false;
        }
        else {
            stateSelElem.disabled = true;
        }
    })

    submitBtnElem.addEventListener('click', () => {
        const cityVal = cityInputElem.value.toLowerCase();
        const countryVal = countrySelElem.options[countrySelElem.selectedIndex].value.toLowerCase();
        const stateVal =  stateSelElem.options[stateSelElem.selectedIndex].value.toLowerCase();


        if (countryVal === 'US' && stateVal === 'none') {
            alert('You must pick a state');
        }
        else if (countryVal === 'none') {
            alert('You must pick a country');
        }
        else if (countryVal === undefined || countryVal === null) {
            alert('Country value is null or undefined');
        }
        else if (cityVal === '') {
            alert('City value is empty');
        }
        else if (cityVal === undefined || cityVal === null) {
            alert('City value is null or undefined');
        }
        else {
            if (countryVal === 'US') {
                getCoordinates(`http://localhost:3333/api/geo/${cityVal}/${stateVal}/${countryVal}`)
            }
            else {
                getCoordinates(`http://localhost:3333/api/geo/${cityVal}/${countryVal}`)
            }
        }
    })
}



main();
