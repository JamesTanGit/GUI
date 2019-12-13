/*  
    James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    December 13 2019
*/
// Sources: Mostly documentation from W3Schools,
// jQuery, and jQuery UI.

function load_droppable_targets() {
    // make the scrabble board droppable
    $("#scrabble_board td").droppable({
        accept: ".ui-draggable",
        drop: function(event, ui) {
            // the current scrabble tile being dragged
            var draggableID = ui.draggable.attr("id");
            // the current spot on the board that the tile is being dropped on
            var droppableID = $(this).attr("id");

            game_board[find_board_pos(droppableID)].tile = draggableID;
            find_word();

            // if there is already a tile on the spot, this gets executed
            if($(this).find(".ui-draggable").length == 1) {
                var original_tile = $("#" + droppableID).find("img")[0].id;
                console.log(original_tile);

                // startPos has the original position of the current droppable
                var posX = startPos.left;
                var posY = startPos.top;

                // set the position of the old tile.
                $("#" + original_tile).css("left", posX);
                $("#" + original_tile).css("top", posY);
                $("#" + original_tile).css("position", "absolute");

                // put the old tile back on the rack
                $('#rack').append($("#" + original_tile));

                // create the css for the positioning of the new tile
                ui.draggable.css("top", $(this).css("top"));
                ui.draggable.css("left", $(this).css("left"));
                ui.draggable.css("position", "relative");

                // put the new tile in the spot where the old tile was
                $(this).append($(ui.draggable));

                return;
            }

            // Unimplemented function that forces the user to start at the star on the board
            // if(tiles_on_board == 0) {
            //     if (droppableID != star_spot) {
            //         ui.draggable.draggable('option', 'revert', true);
            //         return;
            //     }
            // }

            // create the css for the positioning of the new tile
            ui.draggable.css("top", $(this).css("top"));
            ui.draggable.css("left", $(this).css("left"));
            ui.draggable.css("position", "relative");

            // put the new tile in the spot where the old tile was
            $(this).append($(ui.draggable));
            return;
        },
        out: function(event, ui) {
            var draggableID = ui.draggable.attr("id");
            var droppableID = $(this).attr("id");
            
            // if removed, keep note that it is empty in the game_board array
            game_board[find_board_pos(droppableID)].tile = "pieceX";

            // update the new word
            find_word();
        }
    });

    // make the tile rack droppable
    $("#tile_rack").droppable({
        accept: ".ui-draggable",
        drop: function(event, ui) {
            var draggableID = ui.draggable.attr("id");
            var droppableID = $(this).attr("id");
        }
    });
};

// return the index of the tile in which it was removed
function find_board_pos(given_id) {
    for(var i = 0; i < 15; i++){
        if(game_board[i].id == given_id) {
            return i;
        }
    }
    return -1;
}