// $('.outer-sign-up-div').hide();
// $('.outer-new-post-div').hide();
// $('.outer-log-in-div').hide();
// $('.clue').hide();

$(document).ready(function() {

    var editPost = null;
    
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

    $('.edit-post-cross').on('click', function () {
        $('.outer-edit-post-div').toggleClass('edit-post-display');
    })

    $('.log-in-cross').on('click', function () {
        $('.outer-log-in-div').toggleClass('log-in-display');
    })

    // $('.make-your-own-div').on('click', function (e) {
    //     e.preventDefault()
    //     $('.outer-sign-up-div').show();
    // })

    $('.clue-anchor').on('click', function () {
        $(".large-img-div-2 > b").toggleClass('display-clue');
    })

    $('.red-cross').on('click', function () {
        // $(this).parent('div.large-img-outer-div').remove();
        // return;
        var id= $(this).data('id');
        console.log(id)
        var ths = $(this);
        $.ajax ({
            method: 'DELETE',
            url: 'http://localhost:3000/browse',
            data:{ id:id},
            success: function (request) {
                console.log('delted')
                ths.parent('div.large-img-outer-div').remove();
            }
        })
        
    })



    $('.edit-post-button').on('click', function() {
        var id= $(this).siblings('img.red-cross').data('id');
        console.log(id)
        var ths = $(this);
        $.ajax ({
            method: 'GET',
            url: 'http://localhost:3000/api/post/'+id,
            success: function (request) {
                editPost = request;
                $('#edit-answer-input').val(request.answer);
                $('#edit-clue-input').val(request.clue);
                $('#edit-category').val(request.category);
                $('#edit-form').attr('action', '/api/posts/edit/'+ id);
                console.log(request);
                $('.outer-edit-post-div').toggleClass('edit-post-display');
            }
        })
    })
    $('#edit-form').on('submit', function (e) {
        console.log($(this).serialize())
    })

    $('.picture-clue').on('click', function () {
        
        $(this).toggleClass('picture-clue-large');
        $(this).siblings('.large-img-div').toggleClass('large-img-div-2');
        // $('.correct-header').addClass('correct-header-display');
        // $('.correct-header').addClass('incorrect-header-display');
        // $('.incorrect-header').addClass('incorrect-header-display');
        // $('.incorrect-header').addClass('correct-header-display');
    });

    $('.answer-button').on('click', function () {
        let h1 = $(".large-img-div-2 > h1").find(".correct-header");
        console.log(h1);
        $('.clue').hide()
        answer = $(this).attr('post-answer');
        if ($('.answer-input').val() === answer) {
            console.log('Thats Correct');
            $(".large-img-div-2 > h1").toggleClass('correct-header-display');
            $(".large-img-div-2 > h1").text('Correct')
        } else {
            console.log('Wrong. Try again');
            $(".large-img-div-2 > h1").toggleClass('incorrect-header-display');
            $(".large-img-div-2 > h1").text('InCorrect');
        }
    })
    
});