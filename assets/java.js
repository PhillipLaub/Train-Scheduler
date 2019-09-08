// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {

    apiKey: "AIzaSyDNlBiI-uAQtBfYmZMeFrbns_b3VNCTsa8",
    authDomain: "trains-a62df.firebaseapp.com",
    databaseURL: "https://trains-a62df.firebaseio.com",
    storageBucket: ""
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var freq = $("#freq-input").val().trim();




    // var randomDate = "23:01";
    // var defaultFormat = "HH:mm";
    // var convertedDate = moment(trainStart, defaultFormat);
    // console.log(convertedDate.format("HH:mm"));
    // console.log(convertedDate.format("X"));
    // var newDate = moment("24:00", defaultFormat);
    // console.log(convertedDate.diff(newDate, "minutes"));
    // var difference = (convertedDate.diff(newDate, "minutes"));



  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: dest,
      start: trainStart,
      freq: freq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
    alert("Train added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var freq = childSnapshot.val().freq;
  
    // Employee Info
    console.log("Train Name: " + trainName);
    console.log("Destination: " + dest);
    console.log("First Train: " + trainStart);
    console.log("Frequency: " + freq + " minutes");
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMins = moment().diff(moment(trainStart, "X"), "minutes");
    console.log("Train Mins: " + trainMins);
  
    // Calculate the total billed r ate
    var empBilled = trainMins * freq;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainMins)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  