// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUpYjzVNQy6xuwayNB2AXmzYH1aR70g1Y",
    authDomain: "myprojct-b5f93.firebaseapp.com",
    databaseURL: "https://myprojct-b5f93.firebaseio.com",
    projectId: "myprojct-b5f93",
    storageBucket: "myprojct-b5f93.appspot.com",
    messagingSenderId: "57421341727"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// 2. Button for adding 
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trnDest = $("#destination-input").val().trim();
  var trnStart = moment($("#firstTrainTime-input").val().trim(), "HH:mm").subtract(1, "years").format("x");
  var trnRate = $("#frequency-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrn = {
    trainName: trnName,
    destination: trnDest,
    firstTrainTime: trnStart,
    frequency: trnRate
  };

  // Uploads employee data to the database
  database.ref().push(newTrn);

  // Logs everything to console
  console.log(newTrn.trainName);
  console.log(newTrn.destination);
  console.log(newTrn.firstTrainTime);
  console.log(newTrn.frequency);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("")
  $("#frequency-input").val().trim();
});

// 3. Create Firebase event for adding info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().trainName;
  var trnDest = childSnapshot.val().destination;
  var trnStart = childSnapshot.val().firstTrainTime;
  var trnRate = childSnapshot.val().frequency;

  console.log(trnName);
  console.log(trnDest);
  console.log(trnStart);
  console.log(trnRate);

var tFrequency = trnRate;

   
    var firstTime = trnStart;

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" +
  trnRate + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});


