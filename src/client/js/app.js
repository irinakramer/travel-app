// VARIABLES

const result = document.querySelector("#result");
const planner = document.querySelector("#planner");
const addTripButton = document.querySelector(".map__link");
const printButton = document.querySelector("#save");
const deleteButton = document.querySelector("#delete");
const form = document.querySelector("#form");
const leavingFrom = document.querySelector('input[name="from"]');
const goingTo = document.querySelector('input[name="to"]');
const depDate = document.querySelector('input[name="date"]');
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = "irinak";
const timestampNow = (Date.now()) / 1000;
const darkAPIURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
const darkAPIkey = "841a9888f38f0d5458c1f32b892d2d1b";
const pixabayAPIURL = "https://pixabay.com/api/?key=";
const pixabayAPIkey = "19370944-bb3a207b7ef005511416f7836";
const weatherbitAPIKEY = "7863790f3e20471bb6d8e7c6a3a64976";
const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";

// EVENT LISTENERS

// add trip button
const addTripEvList = addTripButton.addEventListener('click', function (e) {
    e.preventDefault();
    planner.scrollIntoView({ behavior: 'smooth' });
})
// form submit
form.addEventListener('submit', addTrip);
// print button
printButton.addEventListener('click', function (e) {
    window.print();
    location.reload();
});
// delete button
deleteButton.addEventListener('click', function (e) {
    form.reset();
    result.classList.add("invisible");
    location.reload();
})

// FUNCTIONS 

/**
 * Countdown
 * @param {*} e 
 */

export function Countdown(depDate) {
    const depDateVal = depDate.value;
    const timestamp = (new Date(depDateVal).getTime()) / 1000;
    return Math.round((timestamp - timestampNow) / 86400);
}

// Function called when form is submitted
export function addTrip(e) {
    e.preventDefault();
    //Acquiring and storing user trip data
    const leavingFromText = leavingFrom.value;
    const goingToText = goingTo.value;
    const depDateText = depDate.value;
    const timestamp = (new Date(depDateText).getTime()) / 1000;
    const countdown = Math.round((timestamp - timestampNow) / 86400);
    console.log("countdown: ", countdown);

    // function checkInput to validate input 
    Client.checkInput(leavingFromText, goingToText);

    getCityInfo(geoNamesURL, goingToText, username)
        .then((cityData) => {
            const cityLat = cityData.geonames[0].lat;
            const cityLong = cityData.geonames[0].lng;
            const country = cityData.geonames[0].countryName;
            const weatherData = getWeather(cityLat, cityLong, depDate);
            //const weatherData = getWeather(cityLat, cityLong, country, timestamp)

            return weatherData;
        })
        .then((weatherData) => {
            const countdown = Countdown(depDate);
            const daysLeft = countdown;
            console.log("addTrip weatherData.data[countdown].max_temp: ", weatherData.data[countdown].max_temp);
            // const userData = postData('http://localhost:8001/add', {
            //     leavingFromText, goingToText, depDateText, daysLeft
            // });
            const userData = postData('http://localhost:8001/add', {
                leavingFromText, goingToText, depDateText, weatherHigh: weatherData.data[countdown].max_temp, weatherLow: weatherData.data[countdown].min_temp, daysLeft
            });
            // depDateText, weather: weatherData.currently.temperature, summary: weatherData.currently.summary, summary: weatherData.weather.description, daysLeft });

            return userData;
        }).then((userData) => {
            updateUI(userData);
            console.log("addTrip userData: ", userData);
        })
}

//function getCityInfo to get city information from Geonames (latitude, longitude, country)

export const getCityInfo = async (geoNamesURL, goingToText, username) => {
    // res equals to the result of fetch function
    const res = await fetch(geoNamesURL + goingToText + "&maxRows=10&" + "username=" + username);
    try {
        const cityData = await res.json();
        console.log("Geonames cityData: ", cityData);
        return cityData;
    } catch (error) {
        console.log("error", error);
    }
};

// function getWeather to get weather information from Dark Sky API 

export const getWeather = async (cityLat, cityLong, depDate) => {
    const req = await fetch(`${weatherbitURL}lat=${cityLat}&lon=${cityLong}&key=${weatherbitAPIKEY}`);
    const countdown = Countdown(depDate);
    // let weatherData = {
    //     tempHigh: '',
    //     tempLow: ''
    // };
    // const req = await fetch(darkAPIURL + "/" + darkAPIkey + "/" + cityLat + "," + cityLong + "," + timestamp + "?exclude=minutely,hourly,daily,flags");
    try {
        const weatherData = await req.json();
        //console.log("weatherbit weatherData: ", weatherData);
        //console.log("weatherbit weatherData.data[countdown]: ", weatherData.data[countdown]);
        // weatherData.tempHigh = weather.data[countdown].high_temp;
        // weatherData.tempLow = weather.data[countdown].low_temp;
        //const weatherData = weather.data[countdown];
        return weatherData;
    } catch (error) {
        console.log("error", error);
    }
}

// Function postData to POST data to our local server
export const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            depCity: data.leavingFromText,
            arrCity: data.goingToText,
            depDate: data.depDateText,
            weatherHigh: data.weatherHigh,
            weatherLow: data.weatherLow,
            summary: data.summary,
            daysLeft: data.daysLeft
        })
    })
    try {
        const userData = await req.json();
        console.log("userData: ", userData);
        return userData;
    } catch (error) {
        console.log("error", error);
    }
}

// Function update UI that reveals the results page with updated trip information including fetched image of the destination

export const updateUI = async (userData) => {
    result.classList.remove("invisible");
    result.scrollIntoView({ behavior: "smooth" });

    const res = await fetch(pixabayAPIURL + pixabayAPIkey + "&q=" + userData.arrCity + "+city&image_type=photo");

    try {
        const imageLink = await res.json();
        const dateSplit = userData.depDate.split("-").reverse().join(" / ");
        document.querySelector("#city").innerHTML = userData.arrCity;
        document.querySelector("#date").innerHTML = dateSplit;
        document.querySelector("#days").innerHTML = userData.daysLeft;
        document.querySelector("#summary").innerHTML = userData.summary;
        document.querySelector("#temp-high").innerHTML = userData.weatherHigh;
        document.querySelector("#temp-low").innerHTML = userData.weatherLow;
        document.querySelector("#fromPixabay").setAttribute('src', imageLink.hits[0].webformatURL);
    }
    catch (error) {
        console.log("error", error);
    }
}

export { addTripEvList }