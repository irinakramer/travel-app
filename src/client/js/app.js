/**
 * 
 * This project requires you to create an asynchronous web app 
 * that uses Web API and user data to dynamically update the UI
 * 
 * Dependencies: Node, Express, OpenweatherApp API Key
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const generate = document.getElementById('generate');

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/* Function to calculate degrees in Celsius */
const tempC = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
}

/* Function to calculate degrees in Fahrenheit */
const tempF = (kelvin) => {
    return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(0);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
    const response = await fetch(`${baseURL}?zip=${newZip}&appid=${apiKey}`);
    try {
        // data - var to store what fetch() returns, in json format
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
    } catch (error) {
        console.log('error', error);
    }
}

/* Function to GET Project Data */
const getProjectData = data => {
    const userEntry = document.getElementById('feelings').value;
    postWeather('/add', {
        date: newDate,
        name: data.name,
        temperature: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        userEntry: userEntry
    });
}

/* Function to Update UI */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('name').innerHTML = `City: ${allData.name}`;
        document.getElementById('temp').innerHTML = `Temperature: ${tempC(allData.temperature)}°C (${tempF(allData.temperature)}°F)`;
        document.getElementById('icon').innerHTML = `<img class="icon" src="http://openweathermap.org/img/wn/${allData.icon}@2x.png" alt="Weather icon">`;
        document.getElementById('description').innerHTML = `Weather: ${allData.description}`;
        document.getElementById('content').innerHTML = `Mood: ${allData.userEntry}`;

    } catch (error) {
        console.log('error', error);
    }
}

/* Function called by event listener */
function performAction() {
    const newZip = document.getElementById('zip').value;
    getWeather(baseURL, newZip, config.API_KEY)
        .then(getProjectData)
        .then(updateUI)
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Event listener to add function to existing HTML DOM element
// generate.addEventListener('click', performAction);
