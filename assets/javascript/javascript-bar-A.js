
function initialize() {
  //Create a map center.
  var mapOptions = {
    center: new google.maps.LatLng(41.500143, -81.699366),
    zoom: 18
  };

  var map = new google.maps.Map(document.getElementById("map"),mapOptions);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(41.500143, -81.699366),
    map: map,
    title:"The Velvet Dog"
  });

  var request = {
    placeId: 'ChIJmbvwd33wMIgRdKHeSCVfPr8'
  };

  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("place",place);
      $("#bar-name").html(place.name);
      $("#address").html("ADDRESS: " + place.formatted_address);
      $("#rating").html("GOOGLE RATING: " + place.rating);
      $("#phone-number").html("PHONE NUMBER: " + place.formatted_phone_number);
      $("#monday").html(place.opening_hours.weekday_text[0]);
      $("#tuesday").html(place.opening_hours.weekday_text[1]);
      $("#wednesday").html(place.opening_hours.weekday_text[2]);
      $("#thursday").html(place.opening_hours.weekday_text[3]);
      $("#friday").html(place.opening_hours.weekday_text[4]);
      $("#saturday").html(place.opening_hours.weekday_text[5]);
      $("#sunday").html(place.opening_hours.weekday_text[6]);
    }
  }
  
};

google.maps.event.addDomListener(window, "load", initialize);

var APIKey = "f393d2f44691c07327a5d4026cd169c9";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Cleveland,USA&appid=" + APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {

  console.log(queryURL);
  console.log(response);
      
  $("#description").html("Description: " + response.weather[0].description);
  $("#wind").html("Wind Speed (mph): " + response.wind.speed);

  var far = (((response.main.temp - 273.15)*1.80)+32);

  $("#temp").html("Temp: "+ Math.round(far));

});
