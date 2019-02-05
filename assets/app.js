
$(document).ready(function() {
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEsM8UEBMgV_YGu0HY1Bjc5F8c-JYCqyA",
    authDomain: "train-scheduler-321d5.firebaseapp.com",
    databaseURL: "https://train-scheduler-321d5.firebaseio.com",
    projectId: "train-scheduler-321d5",
    storageBucket: "train-scheduler-321d5.appspot.com",
    messagingSenderId: "893128927123"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

    $("#submit-button").on("click", function(event){
        
        event.preventDefault();

        var $trainName = $("#train-name-input").val().trim();
        var $destination = $("#destination-input").val().trim();
        var $firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
        var $frequency = $("#frequency-input").val().trim();

        if ($trainName === "" || 
            $destination === "" ||
            $firstTrain === "" ||
            $frequency === "") {

            alert("Please Enter Train Information");

        } else {

        var newTrain = {
            name: $trainName,
            destination: $destination,
            trainTime: $firstTrain,
            frequency: $frequency
            };

        database.ref().push(newTrain);

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");

        };

    });
    
    database.ref().on("child_added", function(childSnapshot) {

        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().trainTime;
        var frequency = childSnapshot.val().frequency;
    
        var timeUntil = moment().diff(moment.unix(trainTime), "minutes");
       
        var timeRemaining = timeUntil % frequency;
        
        var nextArrival = frequency - timeRemaining;
        
        var nextTrainTime = moment().add(nextArrival, "m").format("hh:mm A");
    
        var firstTrainFormatted = moment(moment.unix(trainTime), "hh:mm A").format("hh:mm A");

        var newTrain = $("<tr>").append (
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(firstTrainFormatted),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            
        );

        $("#train-table > tbody").append(newTrain);

    
    });

});
