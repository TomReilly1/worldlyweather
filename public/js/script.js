const cityInputElem = document.getElementById('city');
const countrySelElem = document.getElementById('countries');
const stateSelElem = document.getElementById('states');
const submitBtnElem = document.getElementById('submit-btn');
const geoApiKey = 'OPEN_WEATHER_API_KEY';



async function getCodes(url) {
    const response = await fetch(url);
    return response.json();
}


// async function getCordinates(url){
//     const res = await fetch(url);
//     const arr = await res.json();
//     const obj = arr[0];
//     const lat = obj['lat'];
//     const lon = obj['lon'];

//     getWeather(lat, lon);
// }


// async function getWeather(lat, lon) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${geoApiKey}`
//     const res = await fetch(url);
//     const obj = await res.json();
//     console.log(obj);
//     generateWeatherElements(obj);
// }


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
        let cityVal = cityInputElem.value;
        let countryVal = countrySelElem.options[countrySelElem.selectedIndex].value
        let stateVal =  stateSelElem.options[stateSelElem.selectedIndex].value


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
            let geoApiUrl;

            // if (countryVal === 'US') {
            //     geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},${stateVal},${countryVal}&appid=${geoApiKey}`;
            // }
            // else {
            //     geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},${countryVal}&appid=${geoApiKey}`;
            // }

            if (countryVal === 'US') {
                const vars = [cityVal, countryVal, stateVal];
            }
            else {
                const vars = [cityVal, countryVal];
                getCordinates(`http://localhost:3333/api/${cityVal.toLowerCase()}/${countryVal.toLowerCase()}`)

                // fetch(`http://localhost:3333/api/${cityVal}/${countryVal}`)
                // .then(response => console.log(response))
                // .then(data => console.log(data));
            }

            // getCordinates(geoApiUrl);
        }
    })
    
}


async function getCordinates(url) {
    const res = await fetch(url);
    const arr = await res.json();
    const obj = arr;
    // console.log('SCRIPT 148\n' + res);

    // const arr = await res.json();
    // console.log(json());


    console.log('RES\n' + res);
    console.log('ARR\n' + arr);
    const lat = obj[lat];
    const lon = obj[lon];
    console.log(lat + ' / ' + lon);
    // const lat = obj['lat'];
    // const lon = obj['lon'];

}


main();

