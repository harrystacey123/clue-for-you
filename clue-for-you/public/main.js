$(document).ready(function() {
    $('.outer-sign-up-div').hide();

    var scene = $('#scene').get(0);
    var parallaxInstance = new Parallax(scene);


    $('.sign-up').on('click', function (e) {
        e.preventDefault();
        $('.outer-sign-up-div').show();
    })

    $('.cross').on('click', function () {
        $('.outer-sign-up-div').hide();
    })

    $('.make-your-own-div').on('click', function (e) {
        e.preventDefault()
        $('.outer-sign-up-div').show();
    })

    

});
