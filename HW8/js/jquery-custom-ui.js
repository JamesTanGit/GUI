/*  
    James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    November 25 2019
*/

$(function() {
    // Each slider will have a max value of 50 and a min value
    // of -50. Upon a valid change of the value inside of the
    // slider, a function will be executed to generate the
    // table immediately
    $(".slider1").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#horizontalboundary1").val(ui.value);
            $(ui.value).val($("#horizontalboundary1").val());
        },
        change: function(event, ui) {
            if ($("#submit-form").valid()) {
                myFunction();
            }
        },
        classes: {
            "ui-slider": "ui-widget-header",
        }
    });

    $(".slider2").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#horizontalboundary2").val(ui.value);
            $(ui.value).val($("#horizontalboundary2").val());
        },
        change: function(event, ui) {
            if ($("#submit-form").valid()) {
                myFunction();
            }
        },
        classes: {
            "ui-slider": "ui-widget-header"
        }
    });

    $(".slider3").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#verticalboundary1").val(ui.value);
            $(ui.value).val($("#verticalboundary1").val());
        },
        change: function(event, ui) {
            if ($("#submit-form").valid()) {
                myFunction();
            }
        },
        classes: {
            "ui-slider": "ui-widget-header"
        }
    });

    $(".slider4").slider({
        max: 50,
        min: -50,
        slide: function(event, ui) {
            $("#verticalboundary2").val(ui.value);
            $(ui.value).val($("#verticalboundary2").val());
        },
        change: function(event, ui) {
            if ($("#submit-form").valid()) {
                myFunction();
            }
        },
        classes: {
            "ui-slider": "ui-widget-header"
        }
    });
});

// Sets the slider to the value of the number inside
// of the input box.
$("#horizontalboundary1").change(function () {
    $(".slider1").slider("value", $(this).val());
});

$("#horizontalboundary2").change(function () {
    $(".slider2").slider("value", $(this).val());
});

$("#verticalboundary1").change(function () {
    $(".slider3").slider("value", $(this).val());
});

$("#verticalboundary2").change(function () {
    $(".slider4").slider("value", $(this).val());
});

// Create the tab interface
$(function() {
    $("#tabs").tabs();
});