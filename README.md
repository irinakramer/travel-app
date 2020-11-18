# Weather-Journal App Project
Project 3 from the Udacity Front End Nanodegree program. 


## Description
This project is an asynchronous web app that uses Web API and user data to dynamically update the UI. 


## Prerequisite
This project should run on a local server. Node and Express should be installed on the local machine. Required packages: `express()`, `cors()`, `body-parser`.
	
Create API credentials on OpenWeatherMap.com, then insert API KEY into the `config.js` file and put it into the /website folder.

```
const config = { API_KEY: '12345xyz...' };
```


## Installation
Ensure Node, Express, Cors and Body parser packages are installed. Download files from this repo and navigate to the project folder on your local. Afterwards, to start the server run this command in command line:

```bash
node server.js
```

Navigate to http://localhost:8000/ in your browser.


## Usage
To use the app, enter a US zip code in the input field (required), then enter your notes into the feelings text area(optional). Press the **Generate** button. Weather results will be displayed in the "Most recent Entry" container. The app is fully responsive.


## Author
Code is created by Irina Kramer, using starter code by Udacity.