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




  });
});