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
  console.error(`Oh-noo, ${err.message}.`);
  countriesDiv.insertAdjacentText("beforeend", `${err.message}.`)
};

//fetch api
// const getCountryData = function(country, className)
// {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//   .then(response => {

//     if(!response.ok)
//     {
//       throw new Error(`Country not found (${response.status}).`);
//     }
//     return response.json();
//   })
//   .then((data) => {

//     // console.log(data[0]);
//     renderContry(data[0]);

//     //getting neighbour country
//     const neighbour = data[0].borders[0];
//     return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//   })
//   .then(response => {

//     if(!response.ok)
//     {
//       throw new Error(`No neighbour country found (${response.status}).`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     // console.log(data);
//     renderContry(data, 'neighbour')
//   }).catch(err => {
//     handleError(err);
//   });
// };

// const test = function(lat, long)
// {
//   fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     console.log(`You are in ${data.city}, ${data.country}.`);
//     return data.country;
//   })
// }

// btn.addEventListener('click', function(){

//   getCountryData('portugal');
// });

// const getCountryData = function(lat, long)
// {
//   fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//   .then(response => {
//     console.log(response);
//     return response.json();
//   })
//   .then(data => {
//     console.log(`You are in ${data.city}, ${data.country}.`);
//     return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//   })
//   .then(response => {
//     console.log(response);
//     if(!response.ok)
//     {
//       throw new Error(`Uh-no, Country not found (${response.status}).`)
//     }
//     return response.json();
//   })
//   .then(data => 
//     {
//       renderContry(data[0]);

//       //getting neighbour country
//     const neighbour = data[0].borders[0];
//     return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//     })
//     .then(response => {
//       if(!response.ok)
//       {
//         throw new Error(`Uh-no, No neighbour country was found (${response.status}).`)
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderContry(data, 'neighbour')
//     })
//     .catch(error => handleError(error))
// };

// btn.addEventListener('click', function(){
//   getCountryData(25.204849, 55.270782);
// });


//'https://geocode.xyz/51.50354,-0.12768?geoit=xml' geocode.xyz api

// test(17.686815, 83.218483);
// test(18.520430, 73.856743);
// test(48.856613, 2.352222);
// test(25.204849, 55.270782);

// const getCoords = function()
// {
//   return new Promise(function(resolve, reject){
//     navigator.geolocation.getCurrentPosition(resolve, function(){
//       alert('Failed to get location data.');
//       reject('Faild to get location data.');
//     })
//   })
// }
// getCoords().then(response => console.log(response));
// const getCountryData = function(){
//   getCoords()
//   .then(response => {
//     const lat = response.coords.latitude;
//     const long = response.coords.longitude;
//     return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
//   })
//   .then(res => res.json())
//   .then(data => fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
// };
// getCountryData();
// btn.addEventListener('click', function(){
//   getCountryData();
// });

//using async and await
// const getCountryData = async function(country){
//   const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//   const [data] = await response.json();
//   renderContry(data)
//   const neighbour = data.borders[0];
//   const responseNeighbour = await fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`) 
//   const dataNeighbour = await responseNeighbour.json();
//   console.log(dataNeighbour);
//   renderContry(dataNeighbour, 'neighbour')
// };
// getCountryData('switzerland');

const test = async function(c1, c2, c3, c4){
  const datas = Promise.all([await (await fetch(`https://restcountries.eu/rest/v2/name/${c1}`)).json(),
  await (await fetch(`https://restcountries.eu/rest/v2/name/${c2}`)).json(),
  (await fetch(`https://restcountries.eu/rest/v2/name/${c3}`)).json()
])
  console.log(datas)
};
test('india', 'pakistan', 'china', 'portugal')