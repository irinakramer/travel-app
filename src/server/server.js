// Setup empty JS object to act as endpoint for all routes
projectData = {};

const path = require('path')
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
const port = 8000;
const server = app.listen(port, listening);

// Callback to debug in terminal
function listening() {
    console.log('server is running');
    console.log(`running on localhost: ${port}`);
}


// Initialize all route with a callback function
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// Callback function to complete GET '/all'
function getData(request, response) {
    response.send(projectData);
}

// POST Route
app.post('/add', postData);

function postData(request, response) {
    projectData = request.body;
    response.send({ message: 'data sent' });
}

