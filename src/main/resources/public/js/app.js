var gameModel;

//Get each board
var playerTable =   document.getElementById("PlayerBoard");
var computerTable = document.getElementById("ComputerBoard");

//If the table exists, iterate to get each square in (j+1,i+1) format and set an onclick
if (playerTable != null) {
    for (var i = 0; i < playerTable.rows.length; i++) {
        for (var j = 0; j < playerTable.rows[i].cells.length; j++) {
            playerTable.rows[i].cells[j].onclick = (function (i, j) {


                return function clickPlace() {
                    // This ajax call will asnychonously call the back end, and tell it where to place the ship,
                    // then get back a game model with the ship placed, and display the new model.
                    var request = $.ajax({
                        url: "/placeShip/"+$( "#shipSelec" ).val()+"/"+(j+1)+"/"+(i+1)+"/"+$( "#orientationSelec" ).val(),
                        method: "post",
                        data: JSON.stringify(gameModel),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    });

                    //Checks if the Computer has fired at all and if so then alert the user that you can't place or move ships
                    //after you have fired a single shot.
                    if(gameModel.computerMisses.length > 0 || gameModel.computerHits.length > 0){
                        alert("You have started the game.\nYou can't place down or move ships now.");

                    }else if($( "#orientationSelec" ).val() == "horizontal"){
                        if($( "#shipSelec" ).val() == "aircraftCarrier" && j > 5){
                            alert("Place ship within the board.")

                        }else if( $( "#shipSelec" ).val() == "battleship" && j > 6){
                            alert("Place ship within the board.")

                        }else if( $( "#shipSelec" ).val() == "cruiser" && j > 7){
                            alert("Place ship within the board.")

                        }else if( $( "#shipSelec" ).val() == "destroyer" && j > 8){
                            alert("Place ship within the board.")

                        }else if( $( "#shipSelec" ).val() == "submarine" && j > 7){
                            alert("Place ship within the board.")
                        }
                    }else if($( "#orientationSelec" ).val() == "vertical"){
                         if($( "#shipSelec" ).val() == "aircraftCarrier" && i > 5){
                             alert("Place ship within the board.")

                         }else if( $( "#shipSelec" ).val() == "battleship" && i > 6){
                             alert("Place ship within the board.")

                         }else if( $( "#shipSelec" ).val() == "cruiser" && i > 7){
                             alert("Place ship within the board.")

                         }else if( $( "#shipSelec" ).val() == "destroyer" && i > 8){
                             alert("Place ship within the board.")

                         }else if( $( "#shipSelec" ).val() == "submarine" && i > 7){
                             alert("Place ship within the board.")

                         }
                    }

                    //This will be called when the call is returned from the server.
                    request.done(function( currModel ) {
                        displayGameState(currModel);
                        gameModel = currModel;

                    });

                    // if there is a problem, and the back end does not respond, then an alert will be shown.
                    request.fail(function( jqXHR, textStatus ) {
                        alert( "Request failed: " + textStatus );
                    });
                };


            }(i, j));
            playerTable.rows[i].cells[j].onmouseover = (function (i, j) {
                return function onHover() {
                    if(gameModel.computerMisses.length == 0 && gameModel.computerHits.length == 0) {
                        var l = 5;
                        switch ($("#shipSelec").val()) {
                            case "aircraftCarrier":
                                l = 5;
                                break;
                            case "battleship":
                                l = 4;
                                break;
                            case "submarine":
                                l = 3;
                                break;
                            case "cruiser":
                                l = 3;
                                break;
                            case "destroyer":
                                l = 2;
                                break;
                        }
                        if ($("#orientationSelec").val() == "horizontal" && ((l + j) > 10)) {
                            for (var k = 0; k < l; k++) {
                                $('#MyBoard #' + (i + 1) + '_' + (j + 1 + k)).css("border-color", "red");
                            }
                        }
                        else if ($("#orientationSelec").val() == "horizontal") {
                            for (var k = 0; k < l; k++) {
                                $('#MyBoard #' + (i + 1) + '_' + (j + 1 + k)).css("border-color", "green");
                            }
                        }
                        if ($("#orientationSelec").val() == "vertical" && ((i + l) > 10)) {
                            for (var k = 0; k < l; k++) {
                                $('#MyBoard #' + (i + 1 + k) + '_' + (j + 1)).css("border-color", "red");
                            }
                        }
                        else if ($("#orientationSelec").val() == "vertical") {
                            for (var k = 0; k < l; k++) {
                                $('#MyBoard #' + (i + 1 + k) + '_' + (j + 1)).css("border-color", "green");
                            }
                        }
                    }
                };
            }(i,j));
            playerTable.rows[i].cells[j].onmouseout = (function (i, j) {
                return function onRemove() {
                    if(gameModel.computerMisses.length == 0 && gameModel.computerHits.length == 0) {
                        var l = 5;
                        switch ($("#shipSelec").val()) {
                            case "aircraftCarrier":
                                l = 5;
                                break;
                            case "battleship":
                                l = 4;
                                break;
                            case "submarine":
                                l = 3;
                                break;
                            case "cruiser":
                                l = 3;
                                break;
                            case "destroyer":
                                l = 2;
                                break;
                        }
                        if ($("#orientationSelec").val() == "horizontal") {
                            for (var k = 0; k < l; k++) {
                                $('#MyBoard #' + (i + 1) + '_' + (j + 1 + k)).css("border-color", "white");
                            }
                        }
                        else if ($("#orientationSelec").val() == "vertical") {
                            for (var k = 0; k < l; k++) {
                                $('#MyBoard #' + (i + 1 + k) + '_' + (j + 1)).css("border-color", "white");
                            }
                        }
                    }
                };
            }(i,j));
        }
    }
}

//If the table exists, iterate to get each square in (j+1,i+1) format and set an onclick
if (computerTable != null) {
    for (var i = 0; i < computerTable.rows.length; i++) {
        for (var j = 0; j < computerTable.rows[i].cells.length; j++) {
            computerTable.rows[i].cells[j].onclick = (function (i, j) {


                return function clickFire() {
                    if(gameModel.playerAircraftCarrier.start.Across < 1){
                        alert( "Place Aircraft Carrier!!!\nBefore you can fire.");
                    }
                    if(gameModel.playerBattleship.start.Across < 1){
                        alert( "Place Battleship!!!\nBefore you can fire.");
                    }
                    if(gameModel.playerCruiser.start.Across < 1){
                        alert( "Place Cruiser!!!\nBefore you can fire.");
                    }
                    if(gameModel.playerDestroyer.start.Across < 1){
                        alert( "Place Destroyer!!!\nBefore you can fire.");
                    }
                    if(gameModel.playerSubmarine.start.Across < 1){
                        alert( "Place Submarine!!!\nBefore you can fire.");
                    }


                    var request = $.ajax({
                        url: "/fire/"+(j+1)+"/"+(i+1),
                        method: "post",
                        data: JSON.stringify(gameModel),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    });

                    request.done(function( currModel ) {
                        displayGameState(currModel);
                        gameModel = currModel;

                    });

                    request.fail(function( jqXHR, textStatus ) {
                        alert( "Request failed: " + textStatus );
                    });
                };


            }(i, j));
            computerTable.rows[i].cells[j].onmouseover = (function (i, j) {
                return function onHover() {
                    if(gameModel.playerAircraftCarrier.start.Across > 0 && gameModel.playerBattleship.start.Across > 0 &&
                        gameModel.playerCruiser.start.Across > 0 && gameModel.playerDestroyer.start.Across > 0 &&
                        gameModel.playerSubmarine.start.Across > 0) {
                        $('#TheirBoard #' + (i + 1) + '_' + (j + 1)).css("border-color", "orange");
                    }
                };
            }(i,j));
            computerTable.rows[i].cells[j].onmouseout = (function (i, j) {
                return function onHover() {
                    if(gameModel.playerAircraftCarrier.start.Across > 0 && gameModel.playerBattleship.start.Across > 0 &&
                        gameModel.playerCruiser.start.Across > 0 && gameModel.playerDestroyer.start.Across > 0 &&
                        gameModel.playerSubmarine.start.Across > 0) {
                        $('#TheirBoard #' + (i + 1) + '_' + (j + 1)).css("border-color", "white");
                    }
                };
            }(i,j));
        }
    }
}

//This function will be called once the page is loaded.  It will get a new game model from the back end, and display it.
$( document ).ready(function() {

  $.getJSON("model", function( json ) {
    displayGameState(json);
    gameModel = json;
  });
});
//$( document ).ready(function() {
//
//  $.getJSON("model", function( json ) {
//    displayGameState(currModel);
//    gameModel = json;
//   });
//});

function placeShip() {


   // This ajax call will asnychonously call the back end, and tell it where to place the ship, then get back a game model with the ship placed, and display the new model.
   var request = $.ajax({
     url: "/placeShip/"+$( "#shipSelec" ).val()+"/"+$( "#rowSelec" ).val()+"/"+$( "#colSelec" ).val()+"/"+$( "#orientationSelec" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });


    //Checks if the Computer has fired at all and if so then alert the user that you can't place or move ships
    //after you have fired a single shot.
    if(gameModel.computerMisses.length > 0 || gameModel.computerHits.length > 0){
        alert("You have started the game.\nYou can't place down or move ships now.");

    }else if($( "#orientationSelec" ).val() == "horizontal"){
        if($( "#shipSelec" ).val() == "aircraftCarrier" && $( "#rowSelec" ).val() > 6){
            alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "battleship" && $( "#rowSelec" ).val() > 7){
            alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "cruiser" && $( "#rowSelec" ).val() > 7){
            alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "destroyer" && $( "#rowSelec" ).val() > 8){
            alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "submarine" && $( "#rowSelec" ).val() > 7){
            alert("Place ship within the board.")

        }

    }else if($( "#orientationSelec" ).val() == "vertical"){
        if($( "#shipSelec" ).val() == "aircraftCarrier" && $( "#colSelec" ).val() > 5){
          alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "battleship" && $( "#colSelec" ).val() > 6){
          alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "cruiser" && $( "#colSelec" ).val() > 7){
          alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "destroyer" && $( "#colSelec" ).val() > 8){
          alert("Place ship within the board.")

        }else if( $( "#shipSelec" ).val() == "submarine" && $( "#colSelec" ).val() > 7){
          alert("Place ship within the board.")
        }
    }

   //This will be called when the call is returned from the server.
   request.done(function( currModel ) {
     displayGameState(currModel);
     gameModel = currModel;

   });

   // if there is a problem, and the back end does not respond, then an alert will be shown.
   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });
}

//Similar to placeShip, but instead it will fire at a location the user selects.
function fire(){
    //Checks if each ship has been placed and if not then alert the user that he/she should place
    //the individual ship before he/she can fire.
    if(gameModel.playerAircraftCarrier.start.Across < 1){
        alert( "Place Aircraft Carrier!!!\nBefore you can fire.");
    }
    if(gameModel.playerBattleship.start.Across < 1){
        alert( "Place Battleship!!!\nBefore you can fire.");
    }
    if(gameModel.playerCruiser.start.Across < 1){
        alert( "Place Cruiser!!!\nBefore you can fire.");
    }
    if(gameModel.playerDestroyer.start.Across < 1){
        alert( "Place Destroyer!!!\nBefore you can fire.");
    }
    if(gameModel.playerSubmarine.start.Across < 1){
        alert( "Place Submarine!!!\nBefore you can fire.");
    }


   var request = $.ajax({
     url: "/fire/"+$( "#rowFire" ).val()+"/"+$( "#colFire" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });

   request.done(function( currModel ) {
     displayGameState(currModel);
     gameModel = currModel;

   });

   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });

}

//This function will display the game model.  It displays the ships on the users board, and then shows where there have been hits and misses on both boards.
function displayGameState(gameModel){
$( '#MyBoard td'  ).css("background-color", "blue");
$( '#TheirBoard td'  ).css("background-color", "blue");

// EDITED THIS
displayShip(gameModel.playerAircraftCarrier);
displayShip(gameModel.playerBattleship);
displayShip(gameModel.playerCruiser);
displayShip(gameModel.playerDestroyer);
displayShip(gameModel.playerSubmarine);
// /EDITED THIS

for (var i = 0; i < gameModel.computerMisses.length; i++) {
   $( '#TheirBoard #' + gameModel.computerMisses[i].Down + '_' + gameModel.computerMisses[i].Across ).css("background-color", "green");
}
for (var i = 0; i < gameModel.computerHits.length; i++) {
   $( '#TheirBoard #' + gameModel.computerHits[i].Down + '_' + gameModel.computerHits[i].Across ).css("background-color", "red");
}

for (var i = 0; i < gameModel.playerMisses.length; i++) {
   $( '#MyBoard #' + gameModel.playerMisses[i].Down + '_' + gameModel.playerMisses[i].Across ).css("background-color", "green");
}
for (var i = 0; i < gameModel.playerHits.length; i++) {
   $( '#MyBoard #' + gameModel.playerHits[i].Down + '_' + gameModel.playerHits[i].Across ).css("background-color", "red");
}



}


//This function will display a ship given a ship object in JSON
function displayShip(ship){
 startCoordAcross = ship.start.Across;
 startCoordDown = ship.start.Down;
 endCoordAcross = ship.end.Across;
 endCoordDown = ship.end.Down;
 if(startCoordAcross > 0){
    if(startCoordAcross == endCoordAcross){
        for (i = startCoordDown; i <= endCoordDown; i++) {
            $( '#MyBoard #'+i+'_'+startCoordAcross  ).css("background-color", "yellow");
        }
    } else {
        for (i = startCoordAcross; i <= endCoordAcross; i++) {
            $( '#MyBoard #'+startCoordDown+'_'+i  ).css("background-color", "yellow");
        }
    }
 }
}
