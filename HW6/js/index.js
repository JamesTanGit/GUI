/* James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    November 3 2019
*/
/*Sources: W3Schools*/
/*This function will be executed on click of the submit button*/
function myFunction() {
    /*These represent the horizontal and vertical boundary data from the form*/
    var hb1 = document.getElementById('horizontalboundary1').value;
    var hb2 = document.getElementById('horizontalboundary2').value;
    var vb1 = document.getElementById('verticalboundary1').value;
    var vb2 = document.getElementById('verticalboundary2').value;
    /*This is the range between the numbers of each boundary that will be used for determining the table size*/
    var hrange = Math.abs(hb1 - hb2);
    var vrange = Math.abs(vb1 - vb2);
    /*This will find the min and max of each boundary*/
    var hmin = Math.min(hb1, hb2);
    var hmax = Math.max(hb1, hb2);
    var vmin = Math.min(vb1, vb2);
    var vmax = Math.max(vb1, vb2);
    /*Flags to check that the input is all valid, initially set to invalid*/
    var flag1 = 0, flag2 = 0, flag3 = 0, flag4 = 0;
    /*We will execute innerHTML on this variable later to set and refresh the content of the table*/
    var table = document.getElementById('table');
    /*The numbers must be a number and it must be greater than -51 and less than 51*/
    if (isNaN(parseInt(hb1)) || hb1 < -50 || hb1 > 50) {
        document.getElementById('error1').innerHTML = 'Invalid input. Please enter a number between -50 and 50.'
        flag1 = 0;
    }
    else {
        document.getElementById('error1').innerHTML = '';
        flag1 = 1;
    }
    if (isNaN(parseInt(hb2)) || hb2 < -50 || hb2 > 50) {
        document.getElementById('error2').innerHTML = 'Invalid input. Please enter a number between -50 and 50.'
        flag2 = 0;
    }
    else {
        document.getElementById('error2').innerHTML = '';
        flag2 = 1;
    }
    if (isNaN(parseInt(vb1)) || vb1 < -50 || vb1 > 50) {
        document.getElementById('error3').innerHTML = 'Invalid input. Please enter a number between -50 and 50.'
        flag3 = 0;
    }
    else {
        document.getElementById('error3').innerHTML = '';
        flag3 = 1;
    }
    if (isNaN(parseInt(vb2)) || vb2 < -50 || vb2 > 50) {
        document.getElementById('error4').innerHTML = 'Invalid input. Please enter a number between -50 and 50.'
        flag4 = 0;
    }
    else {
        document.getElementById('error4').innerHTML = '';
        flag4 = 1;
    }
    if (flag1 == 1 && flag2 == 1 && flag3 == 1 && flag4 == 1) {
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
        // Set the content of the table
        document.getElementById('table').innerHTML = content;
    }
}