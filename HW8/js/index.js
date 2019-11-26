/*  
    James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    November 25 2019
*/
/*Sources: W3Schools*/

//Used to assign each tab it's own unique tab number
var tabNumber = 1;
//This function will be executed on click of the submit button
function myFunction() {
    //These represent the horizontal and vertical boundary data from the form
    var hb1 = Math.floor(document.getElementById('horizontalboundary1').value);
    var hb2 = Math.floor(document.getElementById('horizontalboundary2').value);
    var vb1 = Math.floor(document.getElementById('verticalboundary1').value);
    var vb2 = Math.floor(document.getElementById('verticalboundary2').value);
    //This is the range between the numbers of each boundary that will be used for determining the table size
    var hrange = Math.abs(hb1 - hb2);
    var vrange = Math.abs(vb1 - vb2);
    //This will find the min and max of each boundary
    var hmin = Math.min(hb1, hb2);
    var hmax = Math.max(hb1, hb2);
    var vmin = Math.min(vb1, vb2);
    var vmax = Math.max(vb1, vb2);
    //Flags to check that the input is all valid, initially set to invalid
    var flag1 = 0, flag2 = 0, flag3 = 0, flag4 = 0;
    // Creates the first row, leaving a blank cell at the beginning
    var content = '<tr><th></th>';
    // Creates the entire first row, which is the range of the horizontal boundary
    for (var i = 0; i <= hrange; i++ ) {
        content += '<th>' + (hmin + i) + '</th>';
    }
    content += '</tr>';
    // Creates the rest of the rows
    for (var i = 0; i <= vrange; i++) {
        // Creates the first cell in the vertical range
        content += '<tr>';
        content += '<th>' + (vmin + i) + '</th>';
        // Creates the data cells in the multiplication table
        for (var j = 0; j <= hrange; j++) {
            content += '<td>' + (vmin + i) * (hmin + j) + '</td>';
        }
        content += '</tr>';
    }
    // Creates and appends the content of the multiplication table and the content of
    // the tab to the body
    var newHolder = "<div id='tab" + tabNumber + "'>" + "<table class='customTable'>";
    newHolder += content + "</table></div>";
    var listItem = "<li><a href='#tab" + (tabNumber++) + "'>";
    listItem += "<div>" + "HorizontalStart: " + hmin + "</div>";
    listItem += "<div>" + "HorizontalEnd: " + hmax + "</div>";
    listItem += "<div>" + "VerticalStart: " + vmin + "</div>";
    listItem += "<div>" + "VerticalEnd: " + vmax + "</div>";
    listItem += "<div>" + "<button class='btn closeThisTab'>X</button>" + "</div>";
    listItem += "</a></li>";
    $(listItem).appendTo("#tabs ul");
    $(newHolder).appendTo("#tabs");
    $("#tabs").tabs("refresh");
}

// Adds functionality to the buttons so the content of
// the multiplication tables and the tabs are removed
$(document).ready(function () {
    // Close one tab
    $(document).on("click",".closeThisTab", function(){
       var tabId = $(this).closest('a').attr('href');
       $(tabId).remove();
       var tabHref = "a[href='" + tabId + "']";
       $(tabHref).closest("li").remove();
       $("#tabs").tabs("refresh");
    });
    // Close all tabs
    $(document).on("click","#closeAll", function(){
        $("#tabs ul li").not(":first").remove();
        $("#tabs > div").not(":first").remove();
     });
});