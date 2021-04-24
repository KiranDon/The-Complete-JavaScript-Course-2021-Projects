'use strict';
const countriesDiv  = document.querySelector('.countries');

const getCountryData = function(country){
    let html = '';
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function(){
        const [data] = JSON.parse(request.responseText);
        console.log(data);

        html = `<div class="country">
          <img class="countryImage" src="${data.flag}" alt=""/>
          <div class="countryData">
            <h3 class="countryName">${data.name.toUpperCase()}</h3>
            <h4 class="countryRegion">${data.region}</h4>
            <p class="countryRow"><span>👫</span>${(data.population / 1000000).toFixed(2)} M people</p>
            <p class="countryRow"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="countryRow"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </div>`;

        countriesDiv.insertAdjacentHTML('beforeend', html);
    });
};
// getCountryData('usa');
getCountryData('china');
// getCountryData('pakistan');