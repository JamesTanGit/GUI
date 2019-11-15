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
  "Unknown": {
    english: "Unknown",
    spanish: "Desconocido"
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