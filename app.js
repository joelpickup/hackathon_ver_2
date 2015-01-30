var express = require('express');
var app = express();
var Twit = require('twit');
var bodyParser = require('body-parser');
// Listen for incoming requests and serve them.
app.listen(process.env.PORT || 3000);

app.set('views', './views');
app.set('view engine', 'jade');
app.use('/', express.static(__dirname + '/'));
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

app.post('/fight', function(req,res) {
  params = req;
  console.log(req.body);
  var player_1 = {};
  var player_2 = {};

  twitter.get('users/show', { screen_name: req.body['player_1'] },  function (err, data, response) {
    console.log(data);
    player_1_screen_name = data.screen_name;
    player_1_tweet_count = data.statuses_count;
    var firstUnderscore = data.profile_image_url.indexOf('_');
    var secondUnderscore = data.profile_image_url.indexOf('_', firstUnderscore + 1);
    player_1_image_url = [data.profile_image_url.substring(0, secondUnderscore),
             data.profile_image_url.substring(secondUnderscore)];
    dot_index = player_1_image_url[1].indexOf('.');
    file_end = (player_1_image_url[1].substring(dot_index));
    player_1_image_url = player_1_image_url[0] + file_end;
    player_1_followers_count = data.followers_count;
    player_1_favourites_count = data.favourites_count;
    twitter.get('users/show', { screen_name: req.body['player_2'] },  function (err, data, response) {
      var firstUnderscore = data.profile_image_url.indexOf('_');
      var secondUnderscore = data.profile_image_url.indexOf('_', firstUnderscore + 1);
      player_2_image_url = [data.profile_image_url.substring(0, secondUnderscore),
               data.profile_image_url.substring(secondUnderscore)];
      dot_index = player_2_image_url[1].indexOf('.');
      file_end = (player_2_image_url[1].substring(dot_index));
      player_2_image_url = player_2_image_url[0] + file_end;
      console.log(player_1_image_url);
      console.log(player_2_image_url);
      player_2_tweet_count = data.statuses_count;
      player_2_followers_count = data.followers_count;
      player_2_favourites_count = data.favourites_count;
      player_2_screen_name = data.screen_name;

      res.render('fight', {
        name1: player_1_screen_name,
        name2: player_2_screen_name,
        tweets1: JSON.stringify(player_1_tweet_count),
        tweets2: JSON.stringify(player_2_tweet_count),
        image1: player_1_image_url,
        image2: player_2_image_url,
        followers1: player_1_followers_count,
        followers2: player_2_followers_count,
        favourites1: player_1_favourites_count,
        favourites2: player_2_favourites_count
      });
      });

    
    

    
    });
  


// console.log("player 1" + player_1);
// console.log("player 2" + player_2);

  // res.render('index', {data: JSON.stringify(params)});
});

