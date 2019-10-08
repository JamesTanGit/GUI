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