/*  
    James Tan
    James_Tan@student.uml.edu
    UMass Lowell - COMP 4610 GUI Programming I
    November 24 2019
*/
/*Sources: Code Cast - YouTube*/

$(function() {
    /**This part will set the class of the label that will serve as the error message
     * on the client-side as well as the red border that surround the input HTML.
    **/
    $.validator.setDefaults({
        errorClass: 'text-danger',
        highlight: function(element) {
         $(element)
         .closest('.form-group')
         .addClass('has-error');
        },
        unhighlight: function(element) {
         $(element)
         .closest('.form-group')
         .removeClass('has-error');
        }
    });

    /**This is a custom function that will check that the input is not
     * optional as well as checking that the number is within the desired
     * range.
    **/
    $.validator.addMethod('reasonableNumber', function(value, element) {
        return this.optional(element) || value >= -50  && value <= 50;
    }, "Please enter a number between -50 and 50.");

    /**This part makes sure that all of the input are required, satisfies
     * the custom method designed for the validation, and that it is a number.
     * A custom error message is also added for each input.
    **/
    $("#submit-form").validate({
        rules: {
            horizontalboundary1: {
                required: true,
                reasonableNumber: true,
            },
            horizontalboundary2: {
                required: true,
                reasonableNumber: true,
            },
            verticalboundary1: {
                required: true,
                reasonableNumber: true,
            },
            verticalboundary2: {
                required: true,
                reasonableNumber: true,
            }
        },
        messages: {
            horizontalboundary1: {
                required: "This field cannot be left blank. Please input a valid number.",
                reasonableNumber: "Invalid input. Please enter a number between -50 and 50."
            },
            horizontalboundary2: {
                required: "This field cannot be left blank. Please input a valid number.",
                reasonableNumber: "Invalid input. Please enter a number between -50 and 50."
            },
            verticalboundary1: {
                required: "This field cannot be left blank. Please input a valid number.",
                reasonableNumber: "Invalid input. Please enter a number between -50 and 50."
            },
            verticalboundary2: {
                required: "This field cannot be left blank. Please input a valid number.",
                reasonableNumber: "Invalid input. Please enter a number between -50 and 50."
            }
        }
    });

    /**This part will generate the table only if the form is valid upon submission.**/
    $(".submit-button button").click(function() {
        if ($("#submit-form").valid()) {
            myFunction();
        }
      });
});