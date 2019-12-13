/**ENLARGE BUTTON**/
$(document).ready(function () {
    $('#enlarge-btn').off().on('click', function () {
        $('.transform').toggleClass('transform-active');
    });
});

/**BOOTSTRAP TOOLTIP**/
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
})

/**TRANSLATE**/
var dictionary = {
  "Assignment 1: Pacific Trails Resort": {
    english: "Assignment 1: Pacific Trails Resort",
    spanish: "Tarea 1: Resort Senderos Pacíficos"
  },
  "Assignment 2: Styling Your First Web Page With CSS": {
    english: "Assignment 2: Styling Your First Web Page With CSS",
    spanish: "Tarea 2: Diseñando tu primera página web con CSS"
  },
  "Assignment 6: Creating an Interactive Dynamic Table": {
  	english: "Assignment 6: Creating an Interactive Dynamic Table",
  	spanish: "Tarea 6: Crear una tabla dinámica interactiva"
  },
  "In Class Assignment 6: Some More JavaScript": {
  	english: "In Class Assignment 6: Some More JavaScript",
  	spanish: "Tarea 6 en clase: más JavaScript"
  },
  "Assignment 7: Using the jQuery Validation Plugin with Your Dynamic Table": {
    english: "Assignment 7: Using the jQuery Validation Plugin with Your Dynamic Table",
    spanish: "Tarea 7: Uso del complemento jQuery Validation con su tabla dinámica"
  },
  "Assignment 8: Using the jQuery UI Slider and Tab Widgets": {
    english: "Assignment 8: Using the jQuery UI Slider and Tab Widgets",
    spanish: "Tarea 8: Uso del control deslizante jQuery UI y los widgets de pestaña"
  },
  "Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop": {
    english: "Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop",
    spanish: "Tarea 9: Implementación de un poco de Scrabble con arrastrar y soltar"
  }
};
var translator = $("body").translate({lang: "english", t: dictionary});
var translateFlag = 0;
$(document).ready(function () {
	$("#translate-btn").off().on('click', function () {
		if (translateFlag == 0) {
			translator.lang("spanish");
			translateFlag = 1;
		}
		else if (translateFlag == 1) {
			translator.lang("english");
			translateFlag = 0;
		}
	});
});