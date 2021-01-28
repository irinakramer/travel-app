// VARIABLES

const result = document.querySelector("#result");
const planner = document.querySelector("#planner");
const addTripBtn = document.querySelector(".intro__link");
const printBtn = document.querySelector("#save");
const deleteBtn = document.querySelector("#delete");
const form = document.querySelector("#form");
const leavingFrom = document.querySelector('input[name="from"]');
const goingTo = document.querySelector('input[name="to"]');
const depDate = document.querySelector('input[name="date"]');
const geoNamesURL = '//api.geonames.org/searchJSON?q=';
const geoNamesUsername = "irinak";
const pixabayAPIURL = "https://pixabay.com/api/?key=";
const pixabayAPIkey = "19370944-bb3a207b7ef005511416f7836";
const weatherbitAPIKEY = "7863790f3e20471bb6d8e7c6a3a64976";
const weatherbitURL = "https://api.weatherbit.io/v2.0/";
datePickerId.min = new Date().toISOString().split('T')[0];


// FUNCTIONS 

// Function countDown to get number of days before the trip
export function countDown(depDate) {
    const depDateVal = depDate.value;
    const timeToday = Date.now();
    const timeDepDate = (new Date(depDateVal).getTime());
    const countdown = (timeDepDate - timeToday) / (60 * 60 * 24 * 1000);
    return Math.ceil(countdown);
}

// Function addTrip, called when form is submitted
export function addTrip(e) {
    e.preventDefault();
    //Acquiring and storing user trip data
    const leavingFromText = leavingFrom.value;
    const goingToText = goingTo.value;
    const depDateText = depDate.value;
    const countdown = countDown(depDate);
    console.log(countdown);

    // function checkInput to validate input 
    Client.checkInput(leavingFromText, goingToText);


    getCityInfo(geoNamesURL, goingToText, geoNamesUsername)
        .then((cityData) => {
            const cityLat = cityData.geonames[0].lat;
            const cityLong = cityData.geonames[0].lng;
            const weatherData = getWeather(cityLat, cityLong, depDate);
            return weatherData;
        })
        .then((weatherData) => {
            const countdown = countDown(depDate);
            const userData = postData('http://localhost:8001/add', {
                leavingFromText, goingToText, depDateText, weatherHigh: weatherData.max_temp, weatherLow: weatherData.min_temp, summary: countdown < 16 ? weatherData.weather.description : null
            });
            return userData;
        }).then((userData) => {
            updateUI(userData);
        })
}

//function getCityInfo to get city information from Geonames (latitude, longitude)

export const getCityInfo = async (geoNamesURL, goingToText, geoNamesUsername) => {
    // res equals to the result of fetch function
    const res = await fetch(geoNamesURL + goingToText + "&maxRows=10&" + "username=" + geoNamesUsername);
    try {
        const cityData = await res.json();
        if (cityData.totalResultsCount == 0) {
            alert("No data avaiable. Please check city name.")
        }
        return cityData;
    } catch (error) {
        console.log("error", error);
    }
};

// function getWeather to get weather information from Weatherbit
// If trip is less than 16 days away, use Daily Forecast API, otherwise use Normals API

export const getWeather = async (cityLat, cityLong, depDate) => {

    let countdown = countDown(depDate);
    if (countdown < 16) {
        const req = await fetch(`${weatherbitURL}forecast/daily?lat=${cityLat}&lon=${cityLong}&key=${weatherbitAPIKEY}`);
        try {
            const weatherData = await req.json();
            return weatherData.data[countdown];
        } catch (error) {
            console.log("error", error);
        }
    } else {
        let depMonthDay = depDate.value.substring(5);
        let countdown = 0;
        const req = await fetch(`${weatherbitURL}normals?lat=${cityLat}&lon=${cityLong}&start_day=${depMonthDay}&end_day=${depMonthDay}&tp=daily&key=${weatherbitAPIKEY}`);

        try {
            const weatherData = await req.json();
            console.log("getWeather: ", weatherData);
            return weatherData.data[countdown];
        } catch (error) {
            console.log("error", error);
        }
    }
}

// Function postData to POST data to local server
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
            summary: data.summary
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

// Function updateUI that reveals the results container with updated trip information including fetched image of the destination. 

export const updateUI = async (userData) => {
    result.classList.remove("hidden");
    result.scrollIntoView({ behavior: "smooth" });
    const countdown = countDown(depDate);
    const dateFormat = (new Date(depDate.value)).toUTCString().split('00:00:00')[0];

    const res = await fetch(pixabayAPIURL + pixabayAPIkey + "&q=" + userData.arrCity + "+city&image_type=photo");

    try {
        const imageLink = await res.json();
        document.querySelector("#city").innerHTML = userData.arrCity;
        document.querySelector("#date").innerHTML = dateFormat;
        document.querySelector("#days").innerHTML = countdown;
        document.querySelector("#summary").innerHTML = `, ${userData.summary}`;
        document.querySelector("#temp-high").innerHTML = userData.weatherHigh;
        document.querySelector("#temp-low").innerHTML = userData.weatherLow;
        document.querySelector("#weather-text").innerHTML = countdown < 16 ? "Expect weather to be" : "Typical weather for then";
        document.querySelector("#fromPixabay").setAttribute('src', imageLink.hits[0].webformatURL);
    }
    catch (error) {
        console.log("error", error);
    }
}



// EVENT LISTENERS

// add trip button
const addTripEventListener = addTripBtn.addEventListener('click', function (e) {
    e.preventDefault();
    planner.scrollIntoView({ behavior: 'smooth' });
});

// form submit, callback addTrip function
form.addEventListener('submit', addTrip);

// print button
printBtn.addEventListener('click', function (e) {
    window.print();
    location.reload();
});

// delete button
deleteBtn.addEventListener('click', function (e) {
    form.reset();
    result.classList.add("hidden");
    location.reload();
});


export { addTripEventListener }