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
                         
//snapshot for check-ins: Bar A
  database.ref().on('value', function(snapshot){

    $("#check-inA").html(": " + snapshot.val().bar1.checks)

  })

//snapshot for check-ins: Bar B
  database.ref().on('value', function(snapshot){
    
    $("#check-inB").html(": " + snapshot.val().bar2.checks)

  })

//snapshot for check-ins: Bar C
  database.ref().on('value', function(snapshot){
    
  $("#check-inC").html(": " + snapshot.val().bar3.checks)

})

//snapshot for check-ins: Bar D
  database.ref().on('value', function(snapshot){
    
  $("#check-inD").html(": " + snapshot.val().bar4.checks)

})

//snapshot for check-ins: Bar E
  database.ref().on('value', function(snapshot){
    
  $("#check-inE").html(": " + snapshot.val().bar5.checks)

})