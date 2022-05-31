async function getCountryCodes(url) {
    const response = await fetch(url);
    return response.json();
}

function fillSelectElements(optionsObj, keys) {
    const selectElem = document.getElementById('countries');

    for (let i of keys) {
        const optionElem = document.createElement('option');
        optionElem.value = i;
        optionElem.textContent = `(${i}) ${optionsObj[i]}`;
        selectElem.appendChild(optionElem);
    }
}

function main() {
    getCountryCodes('../json/country_codes.json')
    .then(data => {
        let keys = Object.keys(data);
        fillSelectElements(data, keys);
    });
    
}


main();

