
var correctAnswers = 0;

// Validation and answer reveal for quiz questions
$(".section-quiz").carousel({
    interval: false,
    keyboard: false,
    wrap: false
});

$('.section-quiz .quiz-wrap:first-child').addClass('active');
$('.quiz-wrap:last-child .next-question').addClass('hidden');

$(".section-quiz .previous-question").on('click', function () {
    var carousel = $(this).parents(".section-quiz");
    carousel.carousel("prev");
});

$(".section-quiz .next-question").on('click', function () {
    var carousel = $(this).parents(".section-quiz");
    carousel.carousel("next");
});

$('.quiz-wrap').on("click", ".check-answer", function () {
    var input = $(this).parent().prev().children('.input');
    validateAnswer(input);
});

$('.quiz-wrap').on("click", ".get-started", function () {
    var carousel = $(this).parents(".section-quiz");
    carousel.carousel("next");
});

$('.quiz-wrap').on("click", ".true-false", function () {
    validateAnswer($(this));
});

$('.quiz-wrap').on("click", ".input-group-addon", function () {
    var input = $(this).siblings('input');
    validateAnswer(input);
});

function validateAnswer(input) {
    if (input != undefined) {
        var quiz = input.parents('.section-quiz');
        var quizSelector = quiz.attr("id") !== undefined ? "#" + quiz.attr("id") + " " : "";
        var questionID = input.data("id");
        var answer = $(quizSelector + '#answer' + questionID).val();
        var answerwrap = $(quizSelector + '#answer-wrap' + questionID);
        var response = $(quizSelector + "#response" + questionID);
        console.log(quizSelector);

        if (input.val().toLowerCase() === answer.toLowerCase()) {
            response.children(".success").removeClass("hidden");
            correctAnswers++;
            if (correctAnswers > 0) {
                $(".correct-answer-count").text(correctAnswers);
            }
        }
        else {
            response.children(".error").removeClass("hidden");
        }

        $(quizSelector + "#question" + questionID + " .answer-options .input").attr("disabled", true);
        answerwrap.fadeOut("fast");
        response.fadeIn("slow");
        $(quizSelector + "#question" + questionID).fadeIn().css('background-color', '#f6f4f3');
    }
}
;


