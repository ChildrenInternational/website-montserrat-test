/*
Handles Homepage Parallax functionality.
*/

$(window).scroll(function () {
    if ($(window).width() > 768) {
        $('.homepage .section-thematic .column-one ').each(function () {
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 600) {
                $(this).addClass("animated fadeInUp");
            }
        });
        $('.homepage .section-thematic .column-two ').each(function () {
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 600) {
                $(this).addClass("animated fadeInUp");
            }
        });
        $('.homepage .section-thematic-center ').each(function () {
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 600) {
                $(this).addClass("animated fadeInUp");
            }
        });
    };
});

$(document).ready(function () {
    $('.homepage .section-hero').find('img').each(function (n, image) {
        var image = $(image);
        var thisurl = $(this).attr('src');
        image.parents('.homepage .section-hero').css('background-image', 'url(' + thisurl + ')');
    });
});
