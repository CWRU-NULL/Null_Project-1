

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

  //snapshot for check-ins

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

      var newRow = $("<tr>");

      var newName = $("<td>");
      newName.html(place.name);
      newRow.append(newName);

      var newAddress = $("<td>");
      newAddress.html(place.formatted_address);
      newRow.append(newAddress);

      var newRating = $("<td>");
      newRating.html(place.rating);
      newRow.append(newRating);

      var newCheck = $("<td>");
      newCheck.html(checkInsArray[i]);
      newRow.append(newCheck);
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
