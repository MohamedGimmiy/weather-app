

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Cors for cross origin allowance
const cors = require('cors');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
});


// Adding Get Route that returns projectData
app.get('/all',(req, res)=>{
    res.send(projectData);
});

// Adding Post Route that adds data to our projectData variable
app.post('/add',(req, res)=>{
    console.log(req.body)
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.send(projectData);
});