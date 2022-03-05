// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//app.use(bodyParser.urlencoded({extended: false}));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Empty date parameter case
app.get("/api", (req, res) => {

  let dateObj = new Date();

  let unixMs = dateObj.getTime();
  let utcDate = dateObj.toUTCString();

  res.json({unix: unixMs, utc: utcDate});
  
});


// Not empty date parameter case
app.get("/api/:date?", (req, res) => {

  let dateStr = req.params.date;

  let dateObj;
  let responseObj = {};

  // Date string
  if (dateStr.includes('-')) {

    dateObj = new Date(dateStr);
    
  }
  // Unix timestamp
  else {

    let timestamp = parseInt(dateStr);
    dateObj = new Date(timestamp);

  }

  // dateObj.setHours(dateObj.getHours() + 1);
  
  let unixMs = dateObj.getTime();
  responseObj['unix'] = unixMs;
  
  let utcTime = dateObj.toUTCString(); 
  responseObj['utc'] = utcTime;

  // console.log(utcTime);

  if (dateObj == "Invalid Date") res.json({error: "Invalid Date"});

  else res.json(responseObj);
  
});




