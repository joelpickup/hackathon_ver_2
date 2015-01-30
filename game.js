$(document).ready(function(){
  console.log("hello");
  $('#button').on('click', function(){
    console.log("click");
  });
  $('#Fight').on('click', function(){
    console.log("fight");
    tweets1 = parseInt($('#tweets1').text());
    tweets2 = parseInt($('#tweets2').text());
    followers1 = parseInt($('#followers1').text());
    followers2 = parseInt($('#followers2').text());
    favourites1 = parseInt($('#favourites1').text());
    favourites2 = parseInt($('#favourites2').text());
    var tweetsWinner = calculate(tweets1, tweets2);
    var followersWinner = calculate(followers1, followers2);
    var favouritesWinner = calculate(favourites1, favourites2);

    
    setTimeout(
      function(){
      animate(followersWinner, "bounceIn");
      },
      3000
      );
    setTimeout(
      function(){
      animate(favouritesWinner, "rotateIn");
      },
      5000
      );
    animate(tweetsWinner, "tada");

    // animate(favouritesWinner, "bounceOutRight").delay('fast');

  //   $("#player1").animate({
  //     opacity: 0.25,
  //     left: "+=50",
  //     height: "toggle"
  //   }, 5000, function() {
    
  // });

  });
});

var calculate = function(first, second){
  if (first > second){
    return true;
  }else {
    return false;
  }
};

var animate = function(winner, animation){
  if (winner == true){
    $('#player1').addClass(animation);
  }else{
    $('#player2').addClass(animation);
    console.log('player2');
  }
};