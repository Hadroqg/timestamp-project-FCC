// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/", (req, res) => {
  let unix = Date.parse(new Date);
  let date = moment(new Date).format("ddd, DD MMM YYYY HH:mm:ss") + " GMT";
  res.json({ unix: unix, utc: date });

});

app.get("/api/:value", (req, res) => {
  let value = req.params.value;
  let isNumber = /^[0-9]+$/.test(value);
  let date = new Date(value);
  let unix;

  if (isNumber) {
    value = parseInt(value);
    date = moment(value).format("ddd, DD MMM YYYY HH:mm:ss") + " GMT";
    unix = value;
    return res.json({ unix: unix, utc: date });
  }
  if (date.toString() === "Invalid Date") {
    return res.json({ error: date.toString() });
  }
  else {
    unix = Date.parse(date);
    date = moment(date).format("ddd, DD MMM YYYY HH:mm:ss") + " GMT";
    return res.json({ unix: unix, utc: date });
  }



});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
