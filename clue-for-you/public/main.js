// $('.outer-sign-up-div').hide();
// $('.outer-new-post-div').hide();
// $('.outer-log-in-div').hide();
$('.clue').hide();

$(document).ready(function() {
    
    if ($('#scene').get(0)){
        var scene = $('#scene').get(0);
        var parallaxInstance = new Parallax(scene);
    }

    $('.sign-up').on('click', function (e) {
        e.preventDefault();
        $('.outer-sign-up-div').toggleClass('sign-up-display');
    })

    $('.log-in').on('click', function (e) {
        e.preventDefault();
        $('.outer-log-in-div').toggleClass('log-in-display');
    })

    $('.new-post').on('click', function (e) {
        e.preventDefault();
        $('.outer-new-post-div').toggleClass('new-post-display');
    })

    $('.sign-up-cross').on('click', function () {
        $('.outer-sign-up-div').toggleClass('sign-up-display');
    })

    $('.new-post-cross').on('click', function () {
        $('.outer-new-post-div').toggleClass('new-post-display');
    })

    $('.log-in-cross').on('click', function () {
        $('.outer-log-in-div').toggleClass('log-in-display');
    })

    $('.make-your-own-div').on('click', function (e) {
        e.preventDefault()
        $('.outer-sign-up-div').show();
    })

    $('.clue-anchor').on('click', function () {
        $('.clue').show();
    })

    $('.picture-clue').on('click', function () {
        let postId = $(this).attr('data-id');
        $(this).toggleClass('picture-clue-large');
        $(this).siblings('.large-img-div').toggleClass('large-img-div-2');

        let displayClass = $(this).attr('class').split(" ").find(cl => cl==='picture-clue-large');
        if(displayClass === 'picture-clue-large'){
            $.ajax({
                method: 'GET',
                url: `http://localhost:3000/api/posts/${postId}`,
                success: function (response) {
                    $('.large-img-div').append()
                }
            })
        }
    });
    
    $('.edit-answer-button').on('click', function() {
        let postId = $(this).attr('data-id');
        $.ajax({
            method: 'PUT',
            url: `http://localhost:3000/api/posts/${postId}`,
            success: function() {
                var answerVal = $('input[name=editAnswer]').val();
                console.log(answerVal);
            }
        })
    })

});