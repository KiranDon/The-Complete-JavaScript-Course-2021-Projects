'use strict';
const countriesDiv  = document.querySelector('.countries');
const btn = document.querySelector('.btn');

// const getCountryData = function(country){
//     let html = '';
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(request.responseText);
//         // console.log(data);

//         html = `<div class="country">
//           <img class="countryImage" src="${data.flag}" alt=""/>
//           <div class="countryData">
//             <h3 class="countryName">${data.name.toUpperCase()}</h3>
//             <h4 class="countryRegion">${data.region}</h4>
//             <p class="countryRow"><span>👫</span>${(data.population / 1000000).toFixed(2)} M people</p>
//             <p class="countryRow"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="countryRow"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </div>`;

//         countriesDiv.insertAdjacentHTML('beforeend', html);
//     });
// };

const renderContry = function(data, className)
{
  let cls = className ? `'${className}'` : 'country';
  let html = `<div class=${cls}>
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
};

const handleError = function(err){
  console.error(`Oh-noo ${err.message}.`);
  countriesDiv.insertAdjacentText("beforeend", `Oh-noo ${err.message}.`)
};

//fetch api
const getCountryData = function(country, className)
{
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => {

    if(!response.ok)
    {
      throw new Error(`Country not found (${response.status}).`);
    }
    return response.json();
  })
  .then((data) => {

    console.log(data[0]);
    renderContry(data[0]);

    //getting neighbour country
    const neighbour = data[0].borders[0];
    return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
  })
  .then(response => {

    if(!response.ok)
    {
      throw new Error(`No neighbour country found (${response.status}).`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    renderContry(data, 'neighbour')
  }).catch(err => {
    handleError(err);
  });
};


btn.addEventListener('click', function(){
  getCountryData('portugal');
});