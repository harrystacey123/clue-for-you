$(document).ready(function() {

    var scene = $('#scene').get(0);
    var parallaxInstance = new Parallax(scene);
    $('.outer-sign-up-div').hide();

    $('.sign-up').on('click', function () {
        $('.outer-sign-up-div').show();
    })

    $('.cross').on('click', function () {
        $('.outer-sign-up-div').hide();
    })

    // $('.sign-up').on('focusout', function () {
    //     $('.outer-sign-up-div').hide();
    // })

});
