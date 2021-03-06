var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Endpoint for all routes
let projectData = {};

// BodyParser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));

//Get route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Post Route
app.post('/add', addInfo);

function addInfo(req, res) {
    projectData['depCity'] = req.body.depCity;
    projectData['arrCity'] = req.body.arrCity;
    projectData['depDate'] = req.body.depDate;
    projectData['weatherHigh'] = req.body.weatherHigh;
    projectData['weatherLow'] = req.body.weatherLow;
    projectData['summary'] = req.body.summary;
    res.send(projectData);
}

// Setup Server

const port = 8001;
const server = app.listen(process.env.PORT || port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};