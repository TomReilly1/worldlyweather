const cityInputElem = document.getElementById('city');
const countrySelElem = document.getElementById('countries');
const stateSelElem = document.getElementById('states');
const submitBtnElem = document.getElementById('submit-btn');
// const weatherFormElem = document.getElementById('weather-form');
const geoApiKey = '';


async function getCodes(url) {
    const response = await fetch(url);
    return response.json();
}


async function getCordinates(url){
    const res = await fetch(url);
    const arr = await res.json();
    const obj = arr[0];
    const lat = obj['lat'];
    const lon = obj['lon'];

    getWeather(lat, lon);
}


async function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${geoApiKey}`
    const res = await fetch(url);
    const obj = await res.json();
    console.log(obj);
    createElementsFromResult(obj);

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
    const cardDiv = document.getElementById('result-card');

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



    console.log(icon);


    document.getElementById('result-city').textContent = cityName;
    document.getElementById('result-coord').textContent = `${latitude},${longitude}`;
    document.getElementById('result-desc').textContent = weatherDesc;
    document.getElementById('result-temp').textContent = temperature + ' \xB0F';
    document.getElementById('result-feels-like').textContent = 'Feels like it\'s ' + feelsLikeTemp + ' \xB0F';
    document.getElementById('result-img').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById('result-cloud-cover').textContent = cloudCoverage + '%';

    document.getElementById('result-humidity').textContent = humidity + '%';
    document.getElementById('result-wind-speed').textContent = windSpeed + ' mph';

    console.log(`https://en.wikipedia.org/wiki/${cityName}#/media/File:NYC_Downtown_Manhattan_Skyline_seen_from_Paulus_Hook_2019-12-20_IMG_7347_FRD_(cropped).jpg`)

    // var url = "https://en.wikipedia.org/w/api.php"; 

    // var params = {
    //     action: "query",
    //     prop: "images",
    //     titles: "Albert Einstein",
    //     format: "json"
    // };

    // url = url + "?origin=*";
    // Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    // fetch(url)
    //     .then(function(response){return response.json();})
    //     .then(function(response) {
    //         var pages = response.query.pages;
    //         for (var page in pages) {
    //             for (var img of pages[page].images) {
    //                 console.log(img.title);
    //             }
    //         }
    //     })
    //     .catch(function(error){console.log(error);});


    
}

// function generateWeatherElements(obj) {
//     const cardDiv = document.getElementById('result-card');

//     for (let i in obj) {
//         const skipList = [null, 'base', 'cod', 'id'];
//         const currDiv = document.getElementById(i);

//         if (currDiv === null || skipList.includes(i)) {
//             continue;
//         }


        
//         let valueList = currDiv.lastElementChild;
        
//         switch (i) {
//             case 'coord':
//                 const latListItem = valueList.lastElementChild;
//                 const lonListItem = valueList.firstElementChild;

//                 latListItem.textContent = obj[i]['lat'];
//                 lonListItem.textContent = obj[i]['lon'];

//                 break;
//             case 'weather':
//                 const mainListItem = valueList.firstElementChild;
//                 const descListItem = valueList.lastElementChild;

//                 mainListItem.textContent = obj[i][0]['main'];
//                 descListItem.textContent = obj[i][0]['description'];

//                 break;
//             case 'main':
//                 const listNodes = valueList.childNodes;

//                 listNodes[0].textContent = obj[i]['temp'];
//                 listNodes[1].textContent = obj[i]['feels_like'];
//                 listNodes[2].textContent = obj[i]['temp_min'];
//                 listNodes[3].textContent = obj[i]['temp_max'];
//                 listNodes[4].textContent = obj[i]['humidity'];
//                 listNodes[5].textContent = obj[i]['pressure'];
//                 listNodes[6].textContent = obj[i]['grnd_level'];
//                 listNodes[7].textContent = obj[i]['sea_level'];

//                 break;
//             case 'visibility':
//                 const visibListItem = valueList.firstElementChild;

//                 visibListItem.textContent = obj[i];
                
//                 break;
//             case 'clouds':
//                 const cloudsListItem = valueList.firstElementChild;

//                 cloudsListItem.textContent = obj[i]['all'];
                
//                 break;
//             case 'dt':
                
//                 break;
//             case 'sys':
        
//                 break;
//             case 'timezone':
                
//                 break;
//             case 'id':
                
//                 break;
//             case 'name':
                
//                 break;
//             default:
//                 break;
//         }
//     }
// }



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

            if (countryVal === 'US') {
                geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},${stateVal},${countryVal}&appid=${geoApiKey}`;
            }
            else {
                geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},${countryVal}&appid=${geoApiKey}`;
            }


            getCordinates(geoApiUrl);
        }
    })
    
}


main();
fetch('./json/test_obj.json')
    .then(res => res.json())
    .then(data => generateWeatherElements(data))
