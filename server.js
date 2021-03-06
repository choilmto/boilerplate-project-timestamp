// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

//my contribution
app.get("/api/timestamp/:date_string?", function(req, res){
  const dString = req.params.date_string;
  if(dString === undefined){
    let curDateObj = new Date();
    res.json({
      "unix": curDateObj.getTime(),
      "utc": curDateObj.toUTCString()
    });
  }
  let isDate = isNaN(Date.parse(dString));
  if(isDate){
    res.json({"error": "Invalid Date"});
  }
  let dateObj = new Date(dString);
  if (parseInt(dString, 10).toString() === dString) {
    dateObj = new Date(parseInt(dString) * 1000);
  }
  res.json({
    "unix": dateObj.getTime(),
    "utc": dateObj.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
