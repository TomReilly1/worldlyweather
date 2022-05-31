const cityInputElem = document.getElementById('city');
const countrySelElem = document.getElementById('countries');
const stateSelElem = document.getElementById('states');
const weatherFormElem = document.getElementById('weather-form');
const geoApiKey = '';

async function getCodes(url) {
    const response = await fetch(url);
    return response.json();
}

async function callGeoApi(url) {
    const response = await fetch(url);
    return response.json();
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

function main() {
    let countryList;
    let stateList;

    getCodes('../json/countries.json')
    .then(data => {
        countryList = data;
        fillSelectElements('countries', data);
    });

    getCodes('../json/states.json')
    .then(data => {
        stateList = data;
        fillSelectElements('states', data);
    });

    
    countrySelElem.addEventListener('change', () => {
        if (countrySelElem.options[countrySelElem.selectedIndex].value === 'US') {
            stateSelElem.classList.remove('visually-hidden');
        }
        else {
            stateSelElem.classList.add('visually-hidden');
        }
    })

    weatherFormElem.addEventListener('submit', () => {
        let cityVal = cityInputElem.value;
        let countryVal = countrySelElem.options[countrySelElem.selectedIndex].value
        let stateVal =  stateSelElem.options[stateSelElem.selectedIndex].value
        console.log(cityVal);

        // if (countryVal === 'US' && stateVal === 'none') {
        //     alert('You must pick a state');
        // }
        // else if (countryVal === 'none') {
        //     alert('You must pick a country');
        // }
        // else if (countryVal === undefined || countryVal === null) {
        //     alert('Country value is null or undefined');
        // }
        // else if (cityVal === '') {
        //     alert('City value is empty');
        // }
        // else if (cityVal === undefined || cityVal === null) {
        //     alert('City value is null or undefined');
        // }
        // else {
        //     if (countryVal === 'US') {
        //         // let geoApiCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityVal},${stateVal},${countryVal}&appid=${geoApiKey}`;
        //         let geoApiCall = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityVal + ',' + countryVal + '&appid=' + geoApiKey;

        //         console.log(cityVal);
        //         // console.log(countryVal);
        //         // console.log(stateVal);
        //         // console.log(geoApiCall);

        //         // fetch(geoApiCall)
        //         //     .then(res => res.json())
        //         //     .then(data => console.log(data))
        //         //     .catch(err => console.log(err))

        //         // callGeoApi(geoApiCall)
        //         // .then(data => {
        //         //     console.log(data);
        //         // });

        //     }
        //     else {
        //         const geoApiCall = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityVal + ',' + countryVal + '&appid=' + geoApiKey;

        //         console.log(cityVal);
        //         console.log(countryVal);
        //         console.log(geoApiCall);

        //         // fetch(geoApiCall)
        //         //     .then(res => console.log(res))
        //         //     .then(data => console.log(data))
        //         // async function demo(apiCall){
        //         //     const res = fetch(apiCall);
        //         //     const response = await res;
        //         //     const json = await response.json();
        //         //     console.log(json);
        //         //  }
        //         //  demo(geoApiCall);
        //         function handleErrors(response) {
        //             if (!response.ok) throw new Error(response.status);
        //             alert(response.status);
        //             return response;
        //         }
                
        //         fetch(geoApiCall)
        //             // handle network err/success
        //             .then(handleErrors)
        //             // use response of network on fetch Promise resolve
        //             .then(response => alert("ok") )
        //             // handle fetch Promise error
        //             .catch(error => alert(error) );
        //     }
        // }

        fetch("https://api.openweathermap.org/geo/1.0/direct?q=Sydney,AU&appid=ad25ca6eb6b3de04075b9d46711234f3")
            .then(response => alert(response) )
            .then(data => console.log(data) )
            .catch(error => alert(error) );



    })
    
}


main();

