/*  
    James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    December 11 2019
*/

function load_droppable_targets() {
    // tiles_on_board = 0;
    $("#scrabble_board td").droppable({
        accept: ".ui-draggable",
        drop: function(event, ui) {
            var draggableID = ui.draggable.attr("id");    // The current Scrabble tile ID
            var droppableID = $(this).attr("id");         // The current spot on the game board ID

            // For debugging purposes.
            console.log("draggableID: " + draggableID );
            console.log("droppableID: " + droppableID );

            game_board[find_board_pos(droppableID)].tile = draggableID;
            find_word();

            if($(this).find(".ui-draggable").length == 1) {
                // If so, just swap the two tiles. Make sure to update the game board array!
                // Get the originally dropped tile, so we can change it's positions in a second.
                var original_tile = $("#" + droppableID).find("img")[0].id;
                console.log(original_tile);
                // startPos has the original position of the current droppable.
                var posX = startPos.left;
                var posY = startPos.top;

                // Set the position of the old tile.
                $("#" + original_tile).css("left", posX);
                $("#" + original_tile).css("top", posY);
                $("#" + original_tile).css("position", "absolute");

                // Move the tile over to the rack. Prevents weird bugs where the table changes sizes and thinks there's two tiles in one spot.
                $('#rack').append($("#" + original_tile));

                // Now put the new tile in the spot where the older tile was.
                // (ui.draggable refers to the current tile that we want to place on the board.)
                ui.draggable.css("top", $(this).css("top"));
                ui.draggable.css("left", $(this).css("left"));
                ui.draggable.css("position", "relative");

                // Append the new tile to the game board
                $(this).append($(ui.draggable));

                return;             // We're done so quit.
            }

            // if(tiles_on_board == 0) {
            //     if (droppableID != star_spot) {
            //         ui.draggable.draggable('option', 'revert', true);
            //         return;
            //     }
            //     tiles_on_board++;
            // }
            // Now put the new tile in the spot where the older tile was.
            // (ui.draggable refers to the current tile that we want to place on the board.)
            ui.draggable.css("top", $(this).css("top"));
            ui.draggable.css("left", $(this).css("left"));
            ui.draggable.css("position", "relative");

            // Append the new tile to the game board
            $(this).append($(ui.draggable));

            // for(var i = 0; i < 7; i++) {
            //     if (game_tiles[i].id == draggableID) {
            //         game_tiles[i].letter = "-";
            //     }
            // }

            return;
        },
        out: function(event, ui) {
            var draggableID = ui.draggable.attr("id");
            var droppableID = $(this).attr("id");
            
            // Mark that a tile was removed in the game_board variable.
            game_board[find_board_pos(droppableID)].tile = "pieceX";

            // Update the word that was just found.
            find_word();
        }
    });

    $("#tile_rack").droppable({
        accept: ".ui-draggable",
        drop: function(event, ui) {
            var draggableID = ui.draggable.attr("id");
            var droppableID = $(this).attr("id");
        }
    });
};

function find_board_pos(given_id) {
    for(var i = 0; i < 15; i++){
      if(game_board[i].id == given_id) {
        return i;
      }
    }
  
    // Errors return -1.
    return -1;
  }