// Variable for Yelp API
var choiceSelector = "restaurants";
var numValue = 0;
var yelpData = [];
var likedSpots = [];
var aryOfYelpResults = null;

var currentYelpAddr = null;
var currentYelpImage = null;
var currentYelpName = null;
var currentYelpPrice = null;
var currentRating = null;
var currentYelpPhone = null;
var currentYelpURL = null;

$(document).on("click", ".glyphicon-heart", addToFav);
$(document).on("click", ".glyphicon-remove", nextResult);

$(document).keydown(function(e) {
  if(e.keyCode == 37) { // left
    addToFav();
  }
  else if(e.keyCode == 39) { // right
    nextResult();
  }
});

// Yelp APi & Node.js
// $(document).ready(function() {
var yelpAPIFunction = function(address) {
  var queryURL = "https://pure-savannah-62932.herokuapp.com/yelp/?q=" + choiceSelector + '&location=' + address + "&radius=8mi&open_now=true";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var yelpResults = response.jsonBody.businesses;
    aryOfYelpResults = yelpResults;
    displayResults(numValue);
  });
}

// });

function nextResult() {
  displayResults(numValue++);
};

function displayResults(indexPosition) {
  var distanceMiles = Math.round((aryOfYelpResults[numValue].distance * 0.000621371192) * 100) / 100;
  currentYelpAddr = aryOfYelpResults[numValue].location;
  currentYelpImage = aryOfYelpResults[numValue].image_url;
  currentYelpName = aryOfYelpResults[numValue].name;
  currentYelpPrice = aryOfYelpResults[numValue].price;
  currentRating = aryOfYelpResults[numValue].rating;
  currentYelpPhone = aryOfYelpResults[numValue].display_phone;
  currentYelpURL = aryOfYelpResults[numValue].url;
  var yelpImg = "<h2><b>" + currentYelpName + "</b><br><br><div><img src='" + currentYelpImage + "' width='100%'></div></h4><p><b>Price:</b> " + currentYelpPrice + "<br/><b>Rating:</b> " + currentRating + "/6<br/><b>Miles Away:</b> " + distanceMiles + "<br/><b>Phone:</b> " + currentYelpPhone + "</p><a href='" + currentYelpURL + "' class='button medium'>More info</a>";
  $(".img-responsive").html(yelpImg);
	lat = aryOfYelpResults[numValue].coordinates.latitude;
	lng = aryOfYelpResults[numValue].coordinates.longitude;
	console.log('lat', lat);
	console.log('lat', lng);
	newMarker(lat, lng);
}

function addToFav() {
  console.log(aryOfYelpResults[numValue]);
  currentYelpAddr = aryOfYelpResults[numValue].location;
  currentYelpImage = aryOfYelpResults[numValue].image_url;
  currentYelpName = aryOfYelpResults[numValue].name;
  currentYelpPrice = aryOfYelpResults[numValue].price;
  currentRating = aryOfYelpResults[numValue].rating;
  currentYelpPhone = aryOfYelpResults[numValue].display_phone;
  currentYelpURL = aryOfYelpResults[numValue].url;


  var FaveObject = {
    img: currentYelpImage,
    name: currentYelpName,
    address: currentYelpAddr.display_address[0],
    // citeStateZip: currentYelpAddr.display_address,
    rating: currentRating,
    phone: currentYelpPhone,
    price: currentYelpPrice,
    url: currentYelpURL
  }
  //make ajax call to post to backend
  $.ajax({
    url: '/api/faves',
    method: "POST",
    data: FaveObject
  }).done(function(response) {
    // console.log(response);
    // var yelpResults = response.jsonBody.id;
    // aryOfYelpResults = yelpResults;
    displayResults(numValue);
  });
  displayResults(numValue++);
}
