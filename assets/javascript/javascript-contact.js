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


function submitForm() {

    //capture button clicks
    var firstName= $("#form_name").val();
    var lastName = $("#form_lastname").val();
    var email = $("#form_email").val();
    var phoneNumber = $("#form_phone").val();
    var message = $("#form_message").val();


    //push data to database


   $("#form_name").val('');
   $("#form_lastname").val('');
   $("#form_email").val('');
   $("#form_phone").val('');
   $("#form_message").val(''); 
   $(".form-jumbotron").html('<h3>Your application is now pending approval. We will contact you within two buisness days. Thank You!</h3>');
}