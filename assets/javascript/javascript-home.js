function setUrl(url) {
	top.location.href= url;
  };

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(41.500225, -81.699961),
    zoom: 17
  };

  var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
		
	var marker1_clickable = new google.maps.Marker({
		position: new google.maps.LatLng(41.500143, -81.699366),
    label: "A",
		map: map,
		title:"The Velvet Dog"
	});

  var marker2_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.501019, -81.699425),
    label: "B",
    map: map,
    title:"Tequila Ranch"
  });

  var marker3_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.499299, -81.700568),
    label: "C",
    map: map,
    title:"Anatomy Lounge"
  });

  var marker4_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.500858, -81.700230),
    label: "D",
    map: map,
    title:"Dive Bar"
  });

  var marker5_clickable = new google.maps.Marker({
    position: new google.maps.LatLng(41.501069, -81.699997),
    label: "E",
    map: map,
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
google.maps.event.addDomListener(window, 'load', initialize);
      