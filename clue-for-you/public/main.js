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
        $('.clue').toggleClass('display-clue');
    })


    $('.answer-button').on('click', function () {
        $('.clue').hide()
        answer = $(this).attr('post-answer');
        if ($('.answer-input').val() === answer) {
            console.log('Thats Correct');
            $('correct-header').toggleClass('.correct-header-display')
        } else {
            console.log('Wrong. Try again');
            $('.incorrect-header').toggleClass('.incorrect-header-display');
        }
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

//make ajax call to 
// ma


    // $( ".hamburger-cross" ).hide();
    // $( ".hamburger-div" ).hide();
    // $( ".hamburger" ).on('click', function() {
    //     $( ".hamburger-div" ).slideToggle( "slow", function() {
    //         $( ".hamburger" ).hide();
    //         $( ".hamburger-cross" ).show();
    //     });
    // });

    // $( ".cross" ).click(function() {
    // $( ".menu" ).slideToggle( "slow", function() {
    // $( ".cross" ).hide();
    // $( ".hamburger" ).show();
    // });
    // });

    $('.picture-clue').on('click', function () {
        
        $(this).toggleClass('picture-clue-large');
        $(this).siblings('.large-img-div').toggleClass('large-img-div-2');

        // let postId = $(this).attr('data-id');
        // let displayClass = $(this).attr('class').split(" ").find(cl => cl==='picture-clue-large');
        // if(displayClass === 'picture-clue-large'){
        //     $.ajax({
        //         method: 'GET',
        //         url: `http://localhost:3000/api/post/${postId}`,
        //         success: function (response) {
        //             $('.large-img-div').append()
        //         }
        //     })
        // }
    });
    
    // $('.edit-answer-button').on('click', function() {
    //     let postId = $(this).attr('data-id');
    //     $.ajax({
    //         method: 'PUT',
    //         url: `http://localhost:3000/api/posts/${postId}`,
    //         success: function() {
    //             var answerVal = $('input[name=editAnswer]').val();
    //             console.log(answerVal);
    //         }
    //     })
    // })

});