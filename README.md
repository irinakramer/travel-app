# Travel App Project
Project 5 capstone from the Udacity Front End Nanodegree program. 


## Description
This project is a web app that takes user destination city and departure date to return weather forecast for that date. There are three APIs used: Geonames API, Weatherbit API and Pixabay API. 

This project demostrates usage of:
- Setting up Webpack
- Webpack Loaders and Plugins
- NPM
- Express server
- Service workers
- Creating layout and page design
- Sass styles
- Using APIs and creating requests to external urls


## Prerequisite
This project should run on a local server. Node and Express should be installed on the local machine. Required packages listed in `packages.json`.
	
Create API credentials on [Geonamens](http://www.geonames.org/), [Weatherbit](https://www.weatherbit.io/) and [Pixabay](https://pixabay.com/) then insert keys into the app.js Variables section:

```
geoNamesUsername = "your_username";
weatherbitAPIKEY = "12345...";
pixabayAPIkey = "6789...";
```


## Installation
Ensure Node, Express, Cors, Body parser, Webpack and all required packages are installed.

```bash
npm install
```

Set up webpack config files for development and production environments.  Download files from this repo and navigate to the project folder. Afterwards, to start the server run these commands in command line:

```bash
npm run build-dev
npm run build-prod
npm run start
```

Navigate to http://localhost:8001/ in your browser.


## Usage

To use the app, enter a departure and destination city (required) in the input field and press the **Submit** button. City Phone and weather results will be displayed in the box below. If a destination city is invalid, the user will see an error message. The app is fully responsive.


## Author
Code is created by Irina Kramer.
