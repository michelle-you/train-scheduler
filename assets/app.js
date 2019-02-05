
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

    $("#submit-button").on("click", function (event){

        event.preventDefault();

        var $trainName = $("#train-name").val().trim();
        var $destination = $("#destination").val().trim();
        var $firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(1, "years").format("X");;
        var $frequency = $("#frequency").val().trim();

        if ($trainName === "" || 
            $destination === "" ||
            $firstTrain === "" ||
            $frequency === "") {

            alert("Please fill in all details to add new train");

        } else {

        var newTrain = {
            name: $trainName,
            destination: $destination,
            trainTime: $firstTrain,
            frequency: $frequency
            };

        database.ref().push(newTrain);

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-input").val("");
        $("#frequency").val("");

        };

    });

    //creates firebase event when child is added to database.
    database.ref().on("child_added", function(childSnapshot) {

        //collects firebase info in variables
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().trainTime;
        var frequency = childSnapshot.val().frequency;
    
        //convert difference between now and first train to minutes
        var timeUntil = moment().diff(moment.unix(trainTime), "minutes");
        //time apart remainder
        var timeRemaining = timeUntil % frequency;
        //calculates minutes until next train
        var untilArrival = frequency - timeRemaining;
        //next train
        var nextTrainTime = moment().add(untilArrival, "m").format("hh:mm A");
        // adds the intital train time in readable format
        var firstTrainFormatted = moment(moment.unix(trainTime), "hh:mm A").format("hh:mm A");

        //creates new road. appends to page
        var newTrain = $("<tr>").append (
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(firstTrainFormatted),
            $("<td>").text(frequency),
            $("<td>").text(nextTrainTime),
            $("<td>").text(untilArrival),
            
        );

        $("#train-table > tbody").append(newTrain);

    //firebase event closing bracket
    });





//final closing bracket
});
