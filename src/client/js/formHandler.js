import { text } from 'body-parser';

const fetch = require('node-fetch');

/* Global variables */
const errorEl = document.getElementById('error');
const scoreEl = document.getElementById('score');
const subjectivityEl = document.getElementById('subjectivity');
const ironyEl = document.getElementById('irony');
const textEl = document.getElementById('text');

/* Function to handle submit data and retrieve API data */
async function handleSubmit(event) {
    event.preventDefault();

    // clear results from previous submit
    scoreEl.innerHTML = '';
    subjectivityEl.innerHTML = '';
    ironyEl.innerHTML = '';
    textEl.innerHTML = '';

    let formText = document.getElementById('name').value;

    // check if user input is valid
    if (Client.checkForUrl(formText)) {
        await fetch('http://localhost:8001/article', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: formText,
        })
            .then(res => res.json())
            .then(res => {
                updateUI(res);
                console.log('res ui: ', res);
            })

    } else {
        // output error message
        errorEl.innerHTML = 'Invalid URL. Please make sure the URL starts with http:// or https:// and has no spaces.';
        errorEl.classList.add('error');
        console.log('invalid url');
    }
}

/* Function to Update UI */
const updateUI = (res) => {

    // clear error msg
    errorEl.innerHTML = '';
    errorEl.classList.remove('error');

    // insert API results
    scoreEl.innerHTML = `Sentiment Score: ${scoreValue(res.score_tag)}`;
    subjectivityEl.innerHTML = `Subjectivity: ${capitalizeFirstLetter(res.subjectivity)}`;
    ironyEl.innerHTML = `Irony: ${capitalizeFirstLetter(res.irony)}`;
    textEl.innerHTML = `Text: ${res.sentence_list[0].text}`;
}

/* Function to describe score values */
function scoreValue(score) {
    switch (score) {
        case "P+":
            return "Strong positive";
        case "P":
            return "Positive";
        case "NEU":
            return "Neutral";
        case "N":
            return "Negative";
        case "N+":
            return "Strong negative";
        case "NONE":
            return "Without sentiment";
        default:
            return "No data";
    }
}

/* Function to capitalize first letter of string */
function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { handleSubmit, scoreValue }
