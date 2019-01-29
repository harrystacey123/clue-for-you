$('.outer-sign-up-div').hide();
$('.outer-new-post-div').hide();

$(document).ready(function() {
    
    if ($('#scene').get(0)){
        var scene = $('#scene').get(0);
        var parallaxInstance = new Parallax(scene);
    }

    $('.sign-up').on('click', function (e) {
        e.preventDefault();
        $('.outer-sign-up-div').show();
    })

    $('.new-post').on('click', function (e) {
        e.preventDefault();
        $('.outer-new-post-div').show();
    })

    $('.cross').on('click', function () {
        $('.outer-sign-up-div').hide();
    })

    $('.cross').on('click', function () {
        $('.outer-new-post-div').hide();
    })

    $('.make-your-own-div').on('click', function (e) {
        e.preventDefault()
        $('.outer-sign-up-div').show();
    })

    $(".picture-clue").on('click', function(){
        $(".picture-clue").addClass("picture-clue-large");
    });

    // $('.browse-section').append(<h1>req.params.category</h1>)


});
