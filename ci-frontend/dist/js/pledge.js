

// Show / hide pledge form
(function (window) {

    var scrollTopWrapper = $(".scroll-top-wrapper");
    var pledgeFields = $('.pledge-fields');
    var signature = $(".pledge-signature");

    $('.pledge-fields.hide').hide().removeClass("hide").addClass("hide-fields");

    $(document).ready(function () {
        ScrollToPledgeForm();
    });

    // Toggle pledge form display on click
    signature.on('click', function (e) {
        e.preventDefault();
        TogglePledgeForm();
        ScrollToPledgeForm();
    });

    // Validate each field on blur
    $('*[data-val=true]').on('blur', function () {
        $(this).valid();
        enableSubmitButton();
    });

    // Available Character Count
    $('.count-chars').each(function () {
        var input = $(this);
        var maxCount = input.attr("data-val-length-max");
        var charCount = input.val().length;
        $('#availableChars span').text(maxCount - charCount);
    });

    $('.count-chars').on('keyup input', function () {
        var $this = $(this);
        var len = $this.val().length;
        var dataMax = $this.attr("data-val-length-max");
        var max = parseInt(dataMax) ? parseInt(dataMax) : 500;

        if (len > max) {
            $this.val($this.val().substring(0, max));
        } else {
            $('#availableChars span').text(max - len);
        }
    });

    //Toggle Pledge Form
    function TogglePledgeForm() {
        var showForm = pledgeFields.hasClass("hide-fields");

        pledgeFields.removeClass("hide-fields");
        pledgeFields.toggleClass("show-fields", showForm);

        pledgeFields.slideToggle(function () {
            pledgeFields.toggleClass("hide-fields", !showForm);

            if (showForm)
                $(".pledge-fields input[type!=hidden]:first").focus();
        });
    }

    //Scroll to plege form
    function ScrollToPledgeForm() {
        if (pledgeFields.hasClass("show-fields")) {
            $('html, body').animate({
                scrollTop: signature.offset().top - 50
            }, 1000);
        }
    }
}(window));

// Enable submit button
function isHuman(response) {
    $('#Pledge').toggleClass("is-human", response != undefined);
    enableSubmitButton();
};

function enableSubmitButton() {
    var pledgeForm = $('#Pledge');

    if (pledgeForm.hasClass("is-human") && pledgeForm.valid())
        document.getElementById("PledgeSubmit").disabled = false;
    else
        document.getElementById("PledgeSubmit").disabled = true;
};

