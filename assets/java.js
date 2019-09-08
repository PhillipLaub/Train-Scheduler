
var config = {
  apiKey: "AIzaSyDNlBiI-uAQtBfYmZMeFrbns_b3VNCTsa8",
  authDomain: "trains-a62df.firebaseapp.com",
  databaseURL: "https://trains-a62df.firebaseio.com",
  storageBucket: ""
};

firebase.initializeApp(config);
var database = firebase.database();


var currentTime = moment().format();
console.log("Current Time: " + currentTime);

$("#add-train-btn").on("click", function() {
  event.preventDefault();

  var trainNameInput = $("#trainName-input")
    .val()
    .trim();

  var destinationInput = $("#destination-input")
    .val()
    .trim();

  var trainTimeInput = moment($("#trainTime-input").val().trim(),"HH:mm").format("HH:mm");
  
  var frequencyInput = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    train: trainNameInput,
    destination: destinationInput,
    firstTrain: trainTimeInput,
    frequency: frequencyInput
  };

  database.ref().push(newTrain);

  console.log("Train Name: " + newTrain.train);
  console.log("Destination: " + newTrain.destination);
  console.log("First Train time: " + newTrain.firstTrain);
  // console.log("Frequency: " + newTrain.frequency);
  console.log("----------------");

  //Empty input container
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#trainTime-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().firstTrain;
  var trainFrequency = childSnapshot.val().frequency;

  var trainTimeConverted = moment(trainTime, "HH:mm");

  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
  // console.log(timeDifference);

  var frequencyMinutes = childSnapshot.val().frequency;
  console.log("Frequency Minutes: " + frequencyMinutes);

  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
  console.log("Minutes Away: " + minutesAway);

  var nextArrival = moment(currentTime)
    .add(minutesAway, "minutes")
    .format("hh:mm A");
  console.log("Next Arrival: " + nextArrival);


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );

  $("#train-table > tbody").append(newRow);
});

