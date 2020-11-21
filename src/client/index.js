import { performAction } from './js/app'

import './styles/style.scss'

console.log("./src/client/index.js is running");

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', Client.performAction);

export {
    performAction
}