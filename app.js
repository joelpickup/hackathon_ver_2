var express = require('express');
var app = express();
var Twit = require('twit');
var bodyParser = require('body-parser');
// Listen for incoming requests and serve them.
app.listen(process.env.PORT || 3000);

app.set('views', './views');
app.set('view engine', 'jade');
app.use(bodyParser());

var twitter = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var tweets;
twitter.get('users/show', { screen_name: 'joel' },  function (err, data, response) {
  tweets = data;
});


// Generate a simple home page.
app.get('/', function(req, res) {
  var tweet = {};
  tweet.user = tweets;
  res.render('index', { data: JSON.stringify(tweets) });
});

app.post('/myaction', function(req,res) {
  params = req;
  console.log(req.body);
  var player_1 = {};
  var player_2 = {};

  twitter.get('users/show', { screen_name: req.body['player_1'] },  function (err, data, response) {
    player_1 = data.statuses_count;
    twitter.get('users/show', { screen_name: req.body['player_2'] },  function (err, data, response) {
      player_2 = data.statuses_count;

      res.render('index', {data: JSON.stringify(player_2),
                            data2: JSON.stringify(player_1)});
      });

    
    

    
    });
  


// console.log("player 1" + player_1);
// console.log("player 2" + player_2);

  // res.render('index', {data: JSON.stringify(params)});
});