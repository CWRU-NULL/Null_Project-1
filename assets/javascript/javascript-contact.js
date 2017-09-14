  var config = {
    apiKey: "AIzaSyBeruKEJb8ribgo0RQ-2xNZtMTTfgkg8Oc",
    authDomain: "whatshappening-de47f.firebaseapp.com",
    databaseURL: "https://whatshappening-de47f.firebaseio.com",
    projectId: "whatshappening-de47f",
    storageBucket: "whatshappening-de47f.appspot.com",
    messagingSenderId: "101836224675"
  };
    
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }  
  
  var database = firebase.database(); 

$('#myForm').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {    
    // handle the invalid form...  
  } else {
    submitForm();
  }
});

function submitForm() {    

    //capture button clicks
    var firstName= $("#form_name").val();
    var lastName = $("#form_lastname").val();
    var email = $("#form_email").val();
    var phoneNumber = $("#form_phone").val();
    var message = $("#form_message").val();

      //push data to database
    database.ref("contacts/").push({
      first_name: firstName,
      last_name:lastName,
      email: email,
      phone_number: phoneNumber,
      message: message

    });  
    //TODO push data to database  

}