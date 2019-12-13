/*  
    James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    December 13 2019
*/
// Sources: Mostly documentation from W3Schools,
// jQuery, and jQuery UI.

$(document).ready(function() {
    // Load up some important variables for the game
    load_pieces_array();
    // Load up the initial 7 pieces on the tile rack
    load_scrabble_pieces();
    // Create the droppable targets on the board and the rack
    load_droppable_targets();
});

function load_pieces_array() {
    // Scorekeeper
    total_score = 0;

    // arrays are in global scope
    // This will be the tiles currently on the tile rack
    game_tiles = [
        {"id": "piece0", "letter": "A"},
        {"id": "piece1", "letter": "B"},
        {"id": "piece2", "letter": "C"},
        {"id": "piece3", "letter": "D"},
        {"id": "piece4", "letter": "E"},
        {"id": "piece5", "letter": "F"},
        {"id": "piece6", "letter": "G"}
    ];

    // This is the distribution of the pieces in the game
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

    // This is the tiles (if any) on the row of the scrabble board
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
    // base url for the scrabble tiles
    var base_url = "images/Scrabble_Tile_";

    // the random letter generated will be put here
    var random_letter = "";

    // the entire html for the piece being generated will be here
    var piece = "";

    // ID of the current piece being generated
    var piece_ID = "";

    // position of the rack
    var pos;

    // set the piece's position (will be adjusted per iteration of the loop)
    var img_left, img_top;
    
    // Load up initial pieces
    for(var i = 0; i < 7; i++) {
        // random letter will be generated
        random_letter = get_random_tile();

        // created the html for the piece
        piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
        piece_ID = "#piece" + i;
        game_tiles[i].letter = random_letter;
    
        // get the position of the rack
        pos = $("#tile_rack").position();
    
        // positioning of the tile piece
        img_left = pos.left + 30 + (50 * i);      // This controls left to right placement.
        img_top = pos.top + 30;                   // This controls top to bottom placement.
    
        // add the tile piece to the rack
        $("#rack").append(piece);

        // add the positioning of the tile piece to the html as css
        $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");
    
        // make the tile piece draggable
        $(piece_ID).draggable({
        appendTo: scrabble_board,
        revert: "invalid",
        start: function(ev, ui) {
            // save original position for swapping tiles
            startPos = ui.helper.position();
        },
        // if invalid, bring the tile back to its original position
        stop: function() {
            $(this).draggable('option','revert','invalid');
            }
        });
    }
}

function get_random_tile() {
    var all_letters = [];
    var total_letters = 0;

    for (var i = 0; i < 26; i++) {
        // Get current letter
        var current_letter = pieces[i].letter;

        // Remaining letters
        var remaining = pieces[i].remaining;

        // Keep track of all the letters for the random call
        total_letters += remaining;

        // Add the remaining number of the current letter to the array
        for (var x = 0; x < remaining; x++) {
            all_letters.push(current_letter);
        }
    }

    // Pick a random number and return that letter
    var random_num = getRandomInt(0, total_letters - 1);
    var letter = all_letters[random_num];

    // Find the letter to decrement
    for (var i = 0; i < 26; i++) {
        if (pieces[i].letter == letter) {
            pieces[i].remaining--;                  
            return letter;
        }
    }

    return -1;
}

// helper function for random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function find_word() {
    var word = "";
    var score = 0;
  
    // generate the current word on the board
    for(var i = 0; i < 15; i++) {
        if(game_board[i].tile != "pieceX") {
            word += find_letter(game_board[i].tile);
            score += find_score(game_board[i].tile);
        }
    }
  
    // Factor in the doubling and tripling of words of certain tiles.
    score += (score * should_double());
    score += (score * should_triple());

    // Put the score of the dropped tile into the HTML document
    $("#score").html(score);
  
    // If the word is not empty, update it on the screen
    if(word != "") {
        $("#word").html(word);
        return;
    }
  
    // Otherwise, set it to blank
    $("#word").html("");
}

// double word
function should_double() {
    if(game_board[1].tile != "pieceX") {
        return 1;
    }
    return 0;
}

// triple word
function should_triple() {
    if(game_board[13].tile != "pieceX") {
        return 2;
    }
    return 0;
}
  
function find_score(given_id) {
    // find out the letter
    var letter = find_letter(given_id);
    var score = 0;
  
    for(var i = 0; i < 27; i++) {
        // Get an obj of the pieces to look at
        var obj = pieces[i];
  
        if(obj.letter == letter) {
            score = obj.value;
    
            // Factor in the doubling and tripling of letters of certain tiles.
            score += (score * should_double_letter(given_id));
            score += (score * should_triple_letter(given_id));
        return score;
        }
    }
  
    return -1;
}

// double letter
function should_double_letter(given_id) {
    var dropID = find_tile_pos(given_id);
    if(dropID == "drop5" || dropID == "drop9") {
        return 1;
    }
    return 0;
}

// triple letter
function should_triple_letter(given_id) {
    var dropID = find_tile_pos(given_id);
    if(dropID == "drop3" || dropID == "drop11") {
        return 2;
    }
    return 0;
}

function find_letter(given_id) {
    // go through the 7 pieces on the rack
    for(var i = 0; i < 7; i++) {
        if(game_tiles[i].id == given_id) {
            // return the letter of the piece
            return game_tiles[i].letter;
        }
    }
    return -1;
}

// find the position of the board that the tile is on
function find_tile_pos(given_id) {
    for(var i = 0; i < 15; i++){
        if(game_board[i].tile == given_id) {
            return game_board[i].id;
        }
    }
    return -1;
}

$("#submit").click(function() {
    // if there is no word, do nothing
    if (word == "") {
        return -1;
    }

    // update the user's score
    total_score += parseInt($(score).text());
    $("#total_score").html(total_score);

    // clear the board and reset everything
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
    // check if the rack needs new tile pieces
    for(var i = 0; i < 7; i++) {
        // if the place on the rack is missing a piece, generate a new one
        if ($("#rack img:nth-child(" + (1 + i) + ")").attr("id") != ("piece" + i)) {
            var base_url = "images/Scrabble_Tile_";
            var random_letter = "";
            var piece = "";
            var piece_ID = "";
            var pos;
            var img_left, img_top;
            random_letter = get_random_tile();
            piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
            piece_ID = "#piece" + i;
            game_tiles[i].letter = random_letter;
            pos = $("#tile_rack").position();
            img_left = pos.left + 30 + (50 * i);
            img_top = pos.top + 30;
            
            // had think about this part for an hour or so because
            // the way I implemented it was kind of tricky, but we
            // need this to append the piece properly to the rack
            if (i != 6) {
                if ($("#rack img").eq(i).length == 0) {
                    $("#rack img").eq(i - 1).after(piece);
                }
                else {
                    $("#rack img").eq(i).before(piece);
                }
            }
            else {
                $("#rack img").eq(i - 1).after(piece);
            }

            $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");

            // Make the piece draggable
            $(piece_ID).draggable({
                appendTo: scrabble_board,
                revert: "invalid",
                start: function(ev, ui) {
                    startPos = ui.helper.position();
                },
                stop: function() {
                    $(this).draggable('option','revert','invalid');
                }
            });
        }
    }
});