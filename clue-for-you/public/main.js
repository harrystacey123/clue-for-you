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

    $('.clue-anchor').on('click', function (e) {
        e.preventDefault();
        $(this).parent('p.clue-class').siblings('b.clue').toggleClass('display-clue');
        $(".large-img-div-2 > b").toggleClass('display-clue');
    })

    $('.red-cross').on('click', function () {
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
        $('.picture-clue').removeClass('picture-clue-large');
        $('.large-img-div').removeClass('large-img-div-2');
        $('b.clue').addClass('display-clue');
        $('h1.correct-header').text('').hide();
        $(this).toggleClass('picture-clue-large');
        $('.correct-header').text('').hide()
        $(this).siblings('.large-img-div').toggleClass('large-img-div-2');
    });

    $('.answer-button').on('click', function (e) {
        $('.clue').hide()

        answer = $(this).attr('post-answer');
        if ($('.answer-input').val() === answer) {
            $(this).parent('div.answer-input-div').siblings('div.harry').children('h1').text("Correct").show()

        } else {
            console.log('Wrong. Try again');
            $(this).parent('div.answer-input-div').siblings('div.harry').children('h1').text("Incorrect").show()
        }
    })

    
});