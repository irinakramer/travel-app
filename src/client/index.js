import { performAction, getWeather, postWeather, getProjectData, updateUI } from './js/app'

import './styles/style.scss'

console.log("./src/client/index.js is running");

const generate = document.getElementById('generate');
// Event listener to add function to existing HTML DOM element
//generate.addEventListener('click', Client.performAction);

document.addEventListener("DOMContentLoaded", () => {
    generate.addEventListener('click', performAction);
});

export {
    performAction
}