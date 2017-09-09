
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

    var bar1check = firebase.database().ref("bar1/checks/")
    
    bar1check.transaction(function(updateCheck){
      return updateCheck +1;
    })

  })

  database.ref().on('value', function(snapshot){

    $("#checks1").html(": " + snapshot.val().bar1.checks)

  })


  //initial review values bar1

  var userReview1= "";
  var userName1= "";
  var userReview2= "";
  var userName2= "";
  var userReview3= "";
  var userName3= "";
  var userReview4= "";
  var userName4= "";
  var userReview5= "";
  var userName5= "";


//venue 1 review

  $("#reviewBtn1").on('click', function(event){

    event.preventDefault();

    //capture button clicks
    var userReview1 = $("#review1").val().trim();
    var userName1 = $("#name1").val().trim();
    var userMusic1 = $("#music1").val().trim();
    var userRating1 = $("#rating1").val().trim();
    var userCrowd1 = $("#crowd1").val().trim();

    database.ref("bar1/reviews/").push({
      review: userReview1,
      name:userName1,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    database.ref("bar1/mostRecent/").push({
      music: userMusic1,
      rating: userRating1,
      crowd: userCrowd1
    });

    var reviewDiv = $("<div>");

  

    

 //   var currentState = "<p>" + userRating1 + "<p>" + "<br>" + "<p>" + userMusic1 + "<p>"
   // "<p>" + userCrowd1 + "<p>";

    

    //$("#currentState").append(currentState);

  })

database.ref().on('value', function(snapshot){

    $("#checks1").html(snapshot.val().bar1.check1);

  });

//database.ref().on("child_added", function(childSnapshot, prevChildKey){

 // database.ref().on('value', function(snapshot){

   var childRef = database.ref().child("bar1/reviews/");

   var name = ""//childSnapshot.val().bar1.reviews.name;
    var review = ""

   childRef.once('value', function(snapshot){
    snapshot.forEach(function(child){
    console.log(child.val().name);
    name = child.val().name;
    review = child.val().review;

    var reviewDiv = $("<div>");

    reviewDiv.attr("class", "review");

    reviewTxt = "<p class='screen-name'>" +  name  + ": " + "<p>"  + "<p>" + review+ "<p>";

    

    reviewDiv.append(reviewTxt);

    $("#reviewBody").append(reviewDiv);

    });

   });



    //var test = snapshot.val().name;
    //console.log(test);
    //console.log(test);

    //var name = ""//childSnapshot.val().bar1.reviews.name;
    //var review = snapshot.val().review;

    console.log(name);
    console.log(review);

   

   // });


