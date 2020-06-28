// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
var express = require('express');
var bodyParser = require('body-parser');
var myCors = require('cors');
// Start up an instance of app
var app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(myCors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const portNumber = 3000;
const serverSuccess = () => {
    console.log(`Server listening at port ${portNumber}`);
};
var server = app.listen(portNumber, serverSuccess);

// Handle Get requests
app.get('/getData', (req, res) => {
    res.send(projectData);
});
// Handel Post requests
app.post('/postData', (req, res) => {
    let newData = req.body;
    projectData['temp'] = newData.main.temp;
    projectData['date'] = newData.date;
    projectData['res'] = newData.userResponse;
});