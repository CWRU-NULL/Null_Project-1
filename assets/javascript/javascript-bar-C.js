//------Weather API Service---------------------------------
var APIKey = "f393d2f44691c07327a5d4026cd169c9";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Cleveland,USA&appid=" + APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
      
  $("#description").html("Description: " + response.weather[0].description);
  
  var mph = (response.wind.speed * 2.2369);

  $("#wind").html("Wind Speed (mph): " + (mph.toFixed(1)));

  var far = (((response.main.temp - 273.15)*1.80)+32);

  $("#temp").html("Temp: "+ Math.round(far));

});


//--------------------------------------------

//review logic/button-click data


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBeruKEJb8ribgo0RQ-2xNZtMTTfgkg8Oc",
    authDomain: "whatshappening-de47f.firebaseapp.com",
    databaseURL: "https://whatshappening-de47f.firebaseio.com",
    projectId: "whatshappening-de47f",
    storageBucket: "whatshappening-de47f.appspot.com",
    messagingSenderId: "101836224675"
  };

  firebase.initializeApp(config);

  var database = firebase.database(); 
                         


  $("#ven1").on('click', function(){

    var bar3check = firebase.database().ref("bar3/checks/")
    
    bar3check.transaction(function(updateCheck){
      return updateCheck +1;
    });

  });

//snapshot for check-ins
  database.ref().on('value', function(snapshot){

    $("#checks1").html(": " + snapshot.val().bar3.checks);
    initialize(snapshot.val().bar3.checks);
  });





//venue 1 review

  $("#reviewBtn1").on('click', function(event){

    event.preventDefault();

    //capture button clicks
    var userReview1 = $("#review1").val().trim();
    var userName1 = $("#name1").val().trim();
    var userMusic1 = $("#music1").val().trim();
    var userRating1 = $("#rating1").val().trim();
    var userCrowd1 = $("#crowd1").val().trim();


    //push data to database
    database.ref("bar3/reviews/").push({
      review: userReview1,
      name:userName1,
      rating: userRating1,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    database.ref("bar3/mostRecent/").push({
      music: userMusic1,
      crowd: userCrowd1
    });

  childRef.endAt().limitToLast(1).on('child_added', function(snapshot){

  name = snapshot.val().name;
  rating = snapshot.val().rating;
  review = snapshot.val().review;
  date = snapshot.val().dateAdded;

  var timestamp = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    


    var reviewDiv = $("<div>");

    reviewDiv.attr("class", "review");

    reviewTxt = "<br>" + "<p class='screen-name'>" + "User: " + name + "</p>"  + 
    "<p>" + "Rating: " + rating + "</p>" +"<p>" + "Review: " + review + "</p>" + "<p class='ts'>" + timestamp + "</p>";

    reviewDiv.append(reviewTxt);

    $("#reviewBody").prepend(reviewDiv);

    $("#review1").val('');
    $("#name1").val('');
    $("#music1").val('');
    $("#rating1").val('');
    $("#crowd1").val('');
    
  });
});





//snapshots for reviews and experience data

var childRef = database.ref().child("bar3/reviews/");
var childRef2 = database.ref().child("bar3/mostRecent/")

var name = ""; 
var review = "";
var crowd ="";
var music = "";
var date = "";

childRef.once('value', function(snapshot){
  snapshot.forEach(function(child){
    name = child.val().name;
    review = child.val().review;
    rating = child.val().rating;
    date = child.val().dateAdded;



    var timestamp = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    


    var reviewDiv = $("<div>");

    reviewDiv.attr("class", "review");

    reviewTxt = "<br>" + "<p class='screen-name'>" + "User: " + name + "</p>"  + 
    "<p>" + "Rating: " + rating + "</p>" +"<p>" + "Review: " + review + "</p>" + "<p class='ts'>" + timestamp + "</p>";

    reviewDiv.append(reviewTxt);

    $("#reviewBody").prepend(reviewDiv);

   });
  });


childRef2.endAt().limitToFirst(1).on('child_added', function(snapshot){

  music = snapshot.val().music;
  crowd = snapshot.val().crowd;

  $("#recCrowd1").text(": " + crowd);
  $("#recMusic1").text(": " + music);
});


//---------Initialize Map------------------

function initialize(pinChecks) {

  var pinIcon = "assets/Images/marker_blackC.png";

  if (pinChecks >= 20) {
    pinIcon = "assets/Images/marker_redC.png";
  }
  else if ((pinChecks >= 10) && (pinChecks <20)){
    pinIcon = "assets/Images/marker_orangeC.png";
  }
  else if ((pinChecks >= 5) && (pinChecks <10)){
    pinIcon = "assets/Images/marker_greenC.png";
  }
  else if ((pinChecks >= 1) && (pinChecks <5)){
    pinIcon = "assets/Images/marker_purpleC.png";
  }
  else{
    pinIcon = "assets/Images/marker_blackC.png";
  }

  //Create a map center.
  var mapOptions = {
    center: new google.maps.LatLng(41.499299, -81.700568),
    zoom: 18
  };

  var map = new google.maps.Map(document.getElementById("map"),mapOptions);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(41.499299, -81.700568),
    map: map,
    icon: pinIcon,
    title:"Anatomy Lounge"
  });

  var request = {
    placeId: 'ChIJWXZ6Fn3wMIgRp6uFhMAQ6cs'
  };

  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
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