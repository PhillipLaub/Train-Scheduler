
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
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.start);
    // console.log(newTrain.freq);
  
    alert("Train added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var freq = childSnapshot.val().freq;
  
    // Train Info
    console.log("Train Name: " + trainName);
    console.log("Destination: " + dest);
    console.log("First Train: " + trainStart);
    console.log("Frequency: " + freq + " minutes");
    console.log("Next Arrival: ");
    console.log("Minutes Away: ");
    console.log("-----------------------");
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text("Placeholder"),
      $("<td>").text("Placehodlder")
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  