/*  
    James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    December 11 2019
*/

$(document).ready(function() {
    load_pieces_array();        // Load up the default pieces array.
    load_scrabble_pieces();     // Load up the 7 random Scrabble pieces.
    load_droppable_targets();   // Load up the targets for the Scrabble pieces.
});

function load_pieces_array() {
    total_score = 0;
    // arrays are in global scope
    game_tiles = [
        {"id": "piece0", "letter": "A"},
        {"id": "piece1", "letter": "B"},
        {"id": "piece2", "letter": "C"},
        {"id": "piece3", "letter": "D"},
        {"id": "piece4", "letter": "E"},
        {"id": "piece5", "letter": "F"},
        {"id": "piece6", "letter": "G"}
    ];

    pieces = [
      {"letter":"A", "value":  1,  "amount":  9,  "remaining":  9},
      {"letter":"B", "value":  3,  "amount":  2,  "remaining":  2},
      {"letter":"C", "value":  3,  "amount":  2,  "remaining":  2},
      {"letter":"D", "value":  2,  "amount":  4,  "remaining":  4},
      {"letter":"E", "value":  1,  "amount": 12,  "remaining": 12},
      {"letter":"F", "value":  4,  "amount":  2,  "remaining":  2},
      {"letter":"G", "value":  2,  "amount":  3,  "remaining":  3},
      {"letter":"H", "value":  4,  "amount":  2,  "remaining":  2},
      {"letter":"I", "value":  1,  "amount":  9,  "remaining":  9},
      {"letter":"J", "value":  8,  "amount":  1,  "remaining":  1},
      {"letter":"K", "value":  5,  "amount":  1,  "remaining":  1},
      {"letter":"L", "value":  1,  "amount":  4,  "remaining":  4},
      {"letter":"M", "value":  3,  "amount":  2,  "remaining":  2},
      {"letter":"N", "value":  1,  "amount":  6,  "remaining":  6},
      {"letter":"O", "value":  1,  "amount":  8,  "remaining":  8},
      {"letter":"P", "value":  3,  "amount":  2,  "remaining":  2},
      {"letter":"Q", "value": 10,  "amount":  1,  "remaining":  1},
      {"letter":"R", "value":  1,  "amount":  6,  "remaining":  6},
      {"letter":"S", "value":  1,  "amount":  4,  "remaining":  4},
      {"letter":"T", "value":  1,  "amount":  6,  "remaining":  6},
      {"letter":"U", "value":  1,  "amount":  4,  "remaining":  4},
      {"letter":"V", "value":  4,  "amount":  2,  "remaining":  2},
      {"letter":"W", "value":  4,  "amount":  2,  "remaining":  2},
      {"letter":"X", "value":  8,  "amount":  1,  "remaining":  1},
      {"letter":"Y", "value":  4,  "amount":  2,  "remaining":  2},
      {"letter":"Z", "value": 10,  "amount":  1,  "remaining":  1},
      {"letter":"_", "value":  0,  "amount":  2,  "remaining":  2}
    ];

    game_board = [
        {"id": "drop0",  "tile": "pieceX"},
        {"id": "drop1",  "tile": "pieceX"},
        {"id": "drop2",  "tile": "pieceX"},
        {"id": "drop3",  "tile": "pieceX"},
        {"id": "drop4",  "tile": "pieceX"},
        {"id": "drop5",  "tile": "pieceX"},
        {"id": "drop6",  "tile": "pieceX"},
        {"id": "drop7",  "tile": "pieceX"},
        {"id": "drop8",  "tile": "pieceX"},
        {"id": "drop9",  "tile": "pieceX"},
        {"id": "drop10", "tile": "pieceX"},
        {"id": "drop11", "tile": "pieceX"},
        {"id": "drop12", "tile": "pieceX"},
        {"id": "drop13", "tile": "pieceX"},
        {"id": "drop14", "tile": "pieceX"}
      ];
}

function load_scrabble_pieces() {
    var base_url = "images/Scrabble_Tile_";             // base URL of the image
    var random_letter = "";                             // Random letter for the tile
    var piece = "";                                     // HTML for the current tile (image tag)
    var piece_ID = "";                                  // ID for the current tile. In the form "piece#" where # is between 0 and 6.
    var pos;                                            // Position of the rack.
    var img_left, img_top;                              // Used to set the tile's position, based on the position of the rack (pos)
    
    // Load up 7 pieces
    for(var i = 0; i < 7; i++) {
        // This gets a random letter (letter's index in the array).
        random_letter = get_random_tile();

        // Make the img HTML and img ID so we can easily append the tiles.
        piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
        piece_ID = "#piece" + i;
        game_tiles[i].letter = random_letter;
    
        // Reposition the tile on top of the rack, nicely in a row with the other tiles.
    
        // We first get the rack's location on the screen. Idea from a Stackoverflow post,
        pos = $("#tile_rack").position();
    
        // Now figure out where to reposition the board piece.
        img_left = pos.left + 30 + (50 * i);      // This controls left to right placement.
        img_top = pos.top + 30;                   // This controls top to bottom placement.
    
        // Add the piece to the screen
        $("#rack").append(piece);

        // Move the piece relative to where the rack is located on the screen.
        $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");
    
        // Make the piece draggable.
        $(piece_ID).draggable({
        appendTo: scrabble_board,
        revert: "invalid",            // This is key. Only the rack and game board are considered valid!
        start: function(ev, ui) {
            // Save original position. (used for swapping tiles)
            startPos = ui.helper.position();  // startPos is a global variable found in variables.js
        },
        stop: function() {
            // If an invalid event is found, this will return the draggable object to its
            // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
            $(this).draggable('option','revert','invalid');
            }
        });
    }
}

function get_random_tile() {
    // Need to take into account that there are 100 tiles total, not just 26 options.
    // Going to create an array of all the possible letters then - 100 to start.
    var all_letters = [];
    var total_letters = 0;

    for (var i = 0; i < 26; i++) {
        var current_letter = pieces[i].letter;    // Get current letter, "A" to start
        var remaining = pieces[i].remaining;      // Remaining letters, "9" for A at the start.
        total_letters += remaining;               // Keep track of ALL the letters for the random call.

        for (var x = 0; x < remaining; x++) {
        all_letters.push(current_letter);       // Add "remaining" number of the current letter to the array.
        }
    }

    // Now all_letters should have 100 letters at the start (less while playing the game)
    // Pick a random number and return that letter.
    var random_num = getRandomInt(0, total_letters - 1);   // Off by one error if we don't subtract. 0 to 100 is bad. Want 0 to 99.
    var letter = all_letters[random_num];       // Save the letter.

    // Find the letter to decrement.
    for (var i = 0; i < 26; i++) {
        if (pieces[i].letter == letter) {
        pieces[i].remaining--;                  // Decrement letter remaining for this letter.
        return letter;                          // Return the letter's index.
        }
    }

    // Error if we get here.
    return -1;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function find_word() {
    var word = "";
    var score = 0;
  
    // Go through the whole game board and generate a possible word.
    for(var i = 0; i < 15; i++) {
        if(game_board[i].tile != "pieceX") {
            word += find_letter(game_board[i].tile);
            score += find_score(game_board[i].tile);
        }
    }
  
    // Factor in the doubling of certain tiles. Since the should_double() function returns 0 or 1,
    // this is easy to account for. If it's 0, 0 is added to the score. If it's 1, the score is doubled.
    score += (score * should_double());
    score += (score * should_triple());
    // Put the score of the dropped tile into the HTML doc.
    $("#score").html(score);
  
    // If the word is not empty, show it on the screen!
    if(word != "") {
      $("#word").html(word);
      return;
    }
  
    // Otherwise the word is now blank.
    $("#word").html("");
}

function should_double() {
    if(game_board[1].tile != "pieceX") {
      return 1;
    }
  
    // Otherwise return 0.
    return 0;
  }

  function should_triple() {
    if(game_board[13].tile != "pieceX") {
      return 2;
    }
  
    // Otherwise return 0.
    return 0;
  }
  
  function find_score(given_id) {
    // First figure out which letter we have.
    var letter = find_letter(given_id);
    var score = 0;
  
    // Since each "letter" is actually a spot in an array in the pieces.json file,
    // we gotta look at each object in the array before we can look at stuff.
    for(var i = 0; i < 27; i++) {
      // Get an object to look at.
      var obj = pieces[i];
  
      // See if this is the right object.
      if(obj.letter == letter) {
        score = obj.value;
  
        // Need to determine if this piece is a DOUBLE or not.
        // Droppable zones 6 & 8 are DOUBLE letter scores.
        score += (score * should_double_letter(given_id));

        score += (score * should_triple_letter(given_id));
  
        return score;
      }
    }
  
    // If we get here, then we weren't given a nice valid letter. >:(
    return -1;
  }

  function should_double_letter(given_id) {
    // Figure out which dropID this tile belongs to.
    var dropID = find_tile_pos(given_id);
  
    // Is this dropID a double spot or not?
    if(dropID == "drop5" || dropID == "drop9") {
      // YES, return 1.
      return 1;
    }
  
    // Otherwise, NO, so return 0.
    return 0;
  }

  function should_triple_letter(given_id) {
    // Figure out which dropID this tile belongs to.
    var dropID = find_tile_pos(given_id);
  
    // Is this dropID a double spot or not?
    if(dropID == "drop3" || dropID == "drop11") {
      // YES, return 1.
      return 2;
    }
  
    // Otherwise, NO, so return 0.
    return 0;
  }

  function find_letter(given_id) {
    // Go through the 7 pieces,
    for(var i = 0; i < 7; i++) {
      // If we found the piece we're looking for, awesome!
      if(game_tiles[i].id == given_id) {
        // Just return its letter!
        return game_tiles[i].letter;
      }
    }
  
    // If we get here, we weren't given a nice draggable ID like "piece1", so return -1
    return -1;
  }

  function find_tile_pos(given_id) {
    for(var i = 0; i < 15; i++){
      if(game_board[i].tile == given_id) {
        return game_board[i].id;
      }
    }
  
    // Errors return -1.
    return -1;
  }

  $("#submit").click(function() {
    if (word == "") {
        return -1;
    }
    total_score += parseInt($(score).text());
    $("#total_score").html(total_score);
    $("td img").remove();
    game_board = [
        {"id": "drop0",  "tile": "pieceX"},
        {"id": "drop1",  "tile": "pieceX"},
        {"id": "drop2",  "tile": "pieceX"},
        {"id": "drop3",  "tile": "pieceX"},
        {"id": "drop4",  "tile": "pieceX"},
        {"id": "drop5",  "tile": "pieceX"},
        {"id": "drop6",  "tile": "pieceX"},
        {"id": "drop7",  "tile": "pieceX"},
        {"id": "drop8",  "tile": "pieceX"},
        {"id": "drop9",  "tile": "pieceX"},
        {"id": "drop10", "tile": "pieceX"},
        {"id": "drop11", "tile": "pieceX"},
        {"id": "drop12", "tile": "pieceX"},
        {"id": "drop13", "tile": "pieceX"},
        {"id": "drop14", "tile": "pieceX"}
      ];
    $("#score").html(0);
    $("#word").html("");
    for(var i = 0; i < 7; i++) {
        if ($("#rack img:nth-child(" + (1 + i) + ")").attr("id") != ("piece" + i)) {
            var base_url = "images/Scrabble_Tile_";             // base URL of the image
            var random_letter = "";                             // Random letter for the tile
            var piece = "";                                     // HTML for the current tile (image tag)
            var piece_ID = "";                                  // ID for the current tile. In the form "piece#" where # is between 0 and 6.
            var pos;                                            // Position of the rack.
            var img_left, img_top;                              // Used to set the tile's position, based on the position of the rack (pos)
            random_letter = get_random_tile();
            piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
            piece_ID = "#piece" + i;
            game_tiles[i].letter = random_letter;
            pos = $("#tile_rack").position();
            img_left = pos.left + 30 + (50 * i);      // This controls left to right placement.
            img_top = pos.top + 30;                   // This controls top to bottom placement.
            if (i != 6) {
                $("#rack img").eq(i).before(piece);
            }
            else {
                $("#rack img").eq(i - 1).after(piece);
            }
            $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");
            // Make the piece draggable.
            $(piece_ID).draggable({
                appendTo: scrabble_board,
                revert: "invalid",            // This is key. Only the rack and game board are considered valid!
                start: function(ev, ui) {
                    // Save original position. (used for swapping tiles)
                    startPos = ui.helper.position();  // startPos is a global variable found in variables.js
                },
                stop: function() {
                    // If an invalid event is found, this will return the draggable object to its
                    // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
                    $(this).draggable('option','revert','invalid');
                }
            });
        }
    }
  });