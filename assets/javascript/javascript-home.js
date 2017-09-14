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

//snapshot for check-ins
  database.ref().on('value', function(snapshot){
    var A = (snapshot.val().bar1.checks);
    var B = (snapshot.val().bar2.checks);
    var C = (snapshot.val().bar3.checks);
    var D = (snapshot.val().bar4.checks);
    var E = (snapshot.val().bar5.checks);
    initialize(A,B,C,D,E);
  });



//--------------------------------------------------
function setUrl(url) {
	top.location.href= url;
  };

function initialize(A,B,C,D,E) {

  var pins = [A,B,C,D,E];
  var letters = ["A","B","C","D","E"];
  var pinsNew = ["assets/Images/marker_blackA.png","assets/Images/marker_blackB.png","assets/Images/marker_blackC.png","assets/Images/marker_blackD.png","assets/Images/marker_blackE.png"];

  for(i=0; i<pins.length; i++){
    if(pins[i] >= 20){
      pinsNew[i] = "assets/Images/marker_red"+letters[i]+".png";
    }
    else if ((pins[i] >= 10) && (pins[i] <20)){
      pinsNew[i] = "assets/Images/marker_orange"+letters[i]+".png";
    }
    else if ((pins[i] >= 5) && (pins[i] <10)){
      pinsNew[i] = "assets/Images/marker_green"+letters[i]+".png";
    }
    else if ((pins[i] >= 1) && (pins[i] <5)){
      pinsNew[i] = "assets/Images/marker_purple"+letters[i]+".png";
    }
    else{
      pinsNew[i] = "assets/Images/marker_black"+letters[i]+".png";
    }
  }

  var pinIcons = {
    pinA: pinsNew[0],
    pinB: pinsNew[1],
    pinC: pinsNew[2],
    pinD: pinsNew[3],
    pinE: pinsNew[4],
  };

  var mapOptions = {
    center: new google.maps.LatLng(41.500225, -81.699961),
    zoom: 17
  };

  var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
		
	var marker1_clickable = new google.maps.Marker({
		position: new google.maps.LatLng(41.500143, -81.699366),
		map: map,
    icon: pinIcons.pinA,
		title:"The Velvet Dog"
	});

  var marker2_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.501019, -81.699425),
    map: map,
    icon: pinIcons.pinB,
    title:"Tequila Ranch"
  });

  var marker3_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.499299, -81.700568),
    map: map,
    icon: pinIcons.pinC,
    title:"Anatomy Lounge"
  });

  var marker4_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.500858, -81.700230),
    map: map,
    icon: pinIcons.pinD,
    title:"Dive Bar"
  });

  var marker5_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.501069, -81.699997),
    map: map,
    icon: pinIcons.pinE,
    title:"Liquid"
  });

	google.maps.event.addListener(marker1_clickable, 'click', function(){
		 setUrl("Venue_A.html");
	})

  google.maps.event.addListener(marker2_clickable, 'click', function(){
     setUrl("Venue_B.html");
  })

  google.maps.event.addListener(marker3_clickable, 'click', function(){
     setUrl("Venue_C.html");
  })

  google.maps.event.addListener(marker4_clickable, 'click', function(){
     setUrl("Venue_D.html");
  })

  google.maps.event.addListener(marker5_clickable, 'click', function(){
     setUrl("Venue_E.html");
  })
}
//google.maps.event.addDomListener(window, 'load', initialize);
      