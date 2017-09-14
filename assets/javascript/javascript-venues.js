

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

  var checkInsArray =[];
  var musicArray=[];

  //snapshot for check-ins

  var childRef1 = database.ref().child("bar1/mostRecent/");

  childRef1.endAt().limitToFirst(1).on('child_added',function(snapshot){
    musicArray.push(snapshot.val().music);
  });

  var childRef2 = database.ref().child("bar2/mostRecent/");

  childRef2.endAt().limitToFirst(1).on('child_added',function(snapshot){
    musicArray.push(snapshot.val().music);
  });

  var childRef3 = database.ref().child("bar3/mostRecent/");

  childRef3.endAt().limitToFirst(1).on('child_added',function(snapshot){
    musicArray.push(snapshot.val().music);
  });

  var childRef4 = database.ref().child("bar4/mostRecent/");

  childRef4.endAt().limitToFirst(1).on('child_added',function(snapshot){
    musicArray.push(snapshot.val().music);
  });

  var childRef5 = database.ref().child("bar5/mostRecent/");

  childRef5.endAt().limitToFirst(1).on('child_added',function(snapshot){
    musicArray.push(snapshot.val().music);
  });

  console.log(musicArray);

  database.ref().on('value', function(snapshot){
    checkInsArray.push(snapshot.val().bar1.checks);
    checkInsArray.push(snapshot.val().bar2.checks);
    checkInsArray.push(snapshot.val().bar3.checks);
    checkInsArray.push(snapshot.val().bar4.checks);
    checkInsArray.push(snapshot.val().bar5.checks);
    console.log(checkInsArray);
    runStuff();
  });

//---------Initialize Places------------------

function initialize(id,links,i) {

  var request = {
    placeId: id
  };

  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("place",place);
      console.log(links);

      var newRow =$("<tr><td class='bar-name'><a href='"+ links +".html'>"+place.name+"</a></td><td><a href='"+ links +".html'>Rating: " + place.rating +" / 5</a></td><td><a href='"+ links +".html'>Check-Ins: " + checkInsArray[i] + "</a></td><td><a href='"+ links +".html'>" + place.formatted_address + "</a></td><td><a href='"+ links +".html'>Type of Music: " + musicArray[i] + "</a></td></tr>");
      // append new row to table
      $("#table-body").append(newRow);
    }
  }
};

var placeIds = ['ChIJmbvwd33wMIgRdKHeSCVfPr8','ChIJf05SgIfwMIgRnSayuqYeqx0','ChIJWXZ6Fn3wMIgRp6uFhMAQ6cs','ChIJgW2cYn3wMIgRUYPGtwYmBP0','ChIJSfYxhofwMIgRT6HDFxucXpY'];
var links=['Venue_A','Venue_B','Venue_C','Venue_D','Venue_E'];

function runStuff(){
  for (i=0;i<placeIds.length;i++){
    initialize(placeIds[i],links[i],i);
  }
};

$(document).ready(function() {
    $("#example").click(function() {
        var href = $(this).find("a").attr("href");
        if(href) {
            window.location = href;
        }
    });

});