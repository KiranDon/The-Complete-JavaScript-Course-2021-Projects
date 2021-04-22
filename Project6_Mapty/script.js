'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.list');
const inputType = document.querySelector('.type');
const inputDistance = document.querySelector('.inputDistance');
const inputDuration = document.querySelector('.inputDuration');
const inputCadence = document.querySelector('.inputCadence');
const inputElevation = document.querySelector('.inputElevation');

class App{
    #map;
    #mapEvent;
    #workouts = [];
    constructor() {
        this._getPosition();

        inputType.addEventListener('change', this._toggleElevationField);

        form.addEventListener('submit', this._newWorkout.bind(this));

        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition() {

        //geoLocation
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
                alert('Failed to get location...');
            })
        }
    }

    _loadMap(position) {

        // console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coords = [latitude, longitude];
    
        //adding map to page
        this.#map = L.map('map').setView(coords, 13);   //coords are our required locations's lat and long..
    
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputCadence.closest('.formItem').classList.toggle('hidden');
        inputElevation.closest('.formItem').classList.toggle('hidden');
    }

    _newWorkout(e) {
        e.preventDefault();

        const validateInput = (...inputs) => inputs.every(input => Number.isFinite(input));
        const allPositive = (...inputs) => inputs.every(input => input > 0);

        //Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        let workout;
        const {lat, lng} = this.#mapEvent.latlng; //to get the current coords of click


        //If Workout -> running, create running object

        if(type==='running'){
            const cadence = +inputCadence.value;

            if(!validateInput(distance, duration, cadence) || !allPositive(distance, duration, cadence))
            {
                return alert("Enter valid inputs...");
            }
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        //If Workout -> cycling, create cycling object
        if(type==='cycling'){
            const elevationGain = +inputElevation.value;

            if(!validateInput(distance, duration, elevationGain) || !allPositive(distance, duration))
            {
                return alert("Enter valid inputs...");
            }
            workout = new Cycling([lat, lng], distance, duration, elevationGain);
        }

        //Add New object to workout array
        this.#workouts.push(workout);

        //Render workout on map as marker
        this._renderWorkoutMarker(workout);

        //Render workout on list
        this._renderWorkout(workout);

        //clear input feilds and close form
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.classList.add('hidden');
        
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 300,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }).setContent(`${workout.type[0].toUpperCase()}${workout.type.slice(1)}  on  ${workout.months[workout.date.getMonth()]}  ${workout.date.getDate()}`))
        .openPopup();
    }

    _renderWorkout(workout){
        let html = `
        <li class="workout workout-${workout.type}" data-id="${workout.id}">
            <h3 class="workoutTitle">${workout.description()}</h3>
            <div class="workoutDetails">
            <div class="oneDetail">
              <span class="one">${workout.type==='running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
              <span class="two">${workout.distance}</span>
              <span class="three">KM</span>
            </div>
            <div class="oneDetail">
              <span class="one">⏱</span>
              <span class="two">${workout.duration}</span>
              <span class="three">MIN</span>
            </div>
          `;

        if(workout.type==='running')
        {
            html += `
                    <div class="oneDetail">
                        <span class="one">⚡</span>
                        <span class="two">${workout.pace.toFixed(1)}</span>
                        <span class="three">MIN/KM</span>
                    </div>
                    <div class="oneDetail">
                        <span class="one">🦶</span>
                        <span class="two">${workout.cadence}</span>
                        <span class="three">SPM</span>
                    </div>
                </div>
            </li>`;
        }

        if(workout.type==='cycling')
        {
            html += `
                <div class="oneDetail">
                    <span class="one">⚡</span>
                    <span class="two">${workout.speed.toFixed(1)}</span>
                    <span class="three">KM/H</span>
                </div>
                <div class="oneDetail">
                    <span class="one">⛰</span>
                    <span class="two">${workout.evevationGain}</span>
                    <span class="three">Meters</span>
                </div>
            </div>
        </li>`;
        }
        
        containerWorkouts.insertAdjacentHTML('beforeend', html);
    }

    _moveToPopup(e) {
        const workoutElement = e.target.closest('.workout');

        if(!workoutElement)
        {
            return;
        }

        const workout = this.#workouts.find(work => work.id === workoutElement.dataset.id);

        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1,
            }
        });

    }
}
const app = new App();

class Workout{
    date = new Date();
    id = (Date.now() + '');
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout{
    type = 'running';
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        //min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }

    description()
    {
        return `${this.type[0].toUpperCase()}${this.type.slice(1)}  on  ${this.months[this.date.getMonth()]}  ${this.date.getDate()}`;
    }
}

class Cycling extends Workout{
    type = 'cycling';
    constructor(coords, distance, duration, evevationGain){
        super(coords, distance, duration);
        this.evevationGain = evevationGain;
        this.calcSpeed();
    }

    calcSpeed(){
        //min/km
        this.speed = this.distance / this.duration;
        return this.speed;
    }

    description()
    {
        return `${this.type[0].toUpperCase()}${this.type.slice(1)}  on  ${this.months[this.date.getMonth()]}  ${this.date.getDate()}`;
    }
}

// const run1 = new Running([10, 15], 5, 22, 120);
// const run2 = new Running([10, 15], 1.6, 5, 160);
// const cyc1 = new Cycling([10, 15], 20, 50, 560);
// const cyc2 = new Cycling([10, 15], 160, 10, 360);

// console.log(run1, run2, cyc1, cyc2);