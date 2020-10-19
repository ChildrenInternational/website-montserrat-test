/// Subscription Capture Block

var subscriptionCaptureBlock = (function() {

    function enableSubmitButton($form, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent) {
        
        if ($form.hasClass("is-human") && $form.valid()){
            if($gdprCountries.length > 0 && $countryDropdown.length > 0 && $gdprConsent.length > 0){

                var gdprCountriesArray = $gdprCountries.val().split(',').map(function(item) {
                    return parseInt(item, 10);
                });
                var selectedCountryInt = parseInt($countryDropdown.val(), 10);

                if(gdprCountriesArray.includes(selectedCountryInt)){
                    if($gdprConsent.is(":checked")){
                        $submitButton.prop("disabled", false);
                    }
                    else{
                        $submitButton.prop("disabled", true);  
                    }
                }
                else{
                    $submitButton.prop("disabled", false);
                }
            }
            else{
                $submitButton.prop("disabled", false);
            }
        } 
        else{
            $submitButton.prop("disabled", true);
        }
    };

    function createSubscriptionRecaptchaWidget($form, $recaptcha, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent) {

        var siteKey = $recaptcha.data("sitekey");
        var widgetId = $recaptcha.attr("id");

        window.grecaptcha.render(widgetId,
            {
                'sitekey': siteKey,
                'callback': isSubscribeHuman,
                'type': "compact"
            });

        function isSubscribeHuman(response) {
            $form.toggleClass("is-human", response != undefined);
            enableSubmitButton($form, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent);
        };
    }

    function renderRecaptcha($form, $recaptcha, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent) {
        if ($recaptcha.children().size() === 0) {
            createSubscriptionRecaptchaWidget($form, $recaptcha, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent);
        }
    };

    function bindControls(subscriptionCaptureBlockSelectors) {

        $(subscriptionCaptureBlockSelectors.form + " *[data-val=true]").on("blur",
            function() {
                var $this = $(this);
                $this.valid();

                var $form = $(subscriptionCaptureBlockSelectors.form);
                var $submitButton = $(subscriptionCaptureBlockSelectors.submitButton);
                var $gdprCountries =  $(subscriptionCaptureBlockSelectors.gdprCountries);
                var $countryDropdown = $(subscriptionCaptureBlockSelectors.countryDropdown);
                var $gdprConsent = $(subscriptionCaptureBlockSelectors.gdprAccept);

                enableSubmitButton($form, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent);
            });

        $(subscriptionCaptureBlockSelectors.gdprMessageLink).on("click", function(e){
            e.preventDefault();
            $(subscriptionCaptureBlockSelectors.gdprMessage).toggle();
        });

        $(subscriptionCaptureBlockSelectors.emailTextBox)
            .off("blur")
            .on("keypress",
                function() {
                    var $this = $(this);
                    var $subscribeButton = $(subscriptionCaptureBlockSelectors.subscribeButton);

                    var validator = $this.validate();
                    var isValid = validator.check($this);
                    validator.submit = {};

                    if (isValid) {
                        $subscribeButton.prop("disabled", false)
                    } else {
                        $subscribeButton.prop("disabled", true);
                    }
                })
            .on("blur",
                function() {
                    var $this = $(this);
                    var $subscribeButton = $(subscriptionCaptureBlockSelectors.subscribeButton);

                    if ($this.valid()) {
                        $subscribeButton.prop("disabled", false)
                    } else {
                        $subscribeButton.prop("disabled", true);
                    }
                });

        $(subscriptionCaptureBlockSelectors.subscribeButton).click(
            function(e) {
                e.preventDefault();

                var $form = $(subscriptionCaptureBlockSelectors.form);
                var $recaptcha = $(subscriptionCaptureBlockSelectors.recaptcha);
                var $submitButton = $(subscriptionCaptureBlockSelectors.submitButton);
                var $subscribeSection = $(subscriptionCaptureBlockSelectors.subscribeSection);
                var $submitSection = $(subscriptionCaptureBlockSelectors.submitSection);
                var $firstNameTextBox = $(subscriptionCaptureBlockSelectors.firstNameTextBox);
                var $gdprCountries =  $(subscriptionCaptureBlockSelectors.gdprCountries);
                var $countryDropdown = $(subscriptionCaptureBlockSelectors.countryDropdown);
                var $gdprConsent = $(subscriptionCaptureBlockSelectors.gdprAccept);

                renderRecaptcha($form, $recaptcha, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent);

                $subscribeSection.fadeOut("fast");
                $submitSection.fadeIn("fast");
                $firstNameTextBox.focus();
            });

        $(subscriptionCaptureBlockSelectors.countryDropdown).on("change", function(e){
            var gdprCountries = $(subscriptionCaptureBlockSelectors.gdprCountries).val();
            var selectedCountry = $(subscriptionCaptureBlockSelectors.countryDropdown).val();
            var gdprCountriesArray = gdprCountries.split(',').map(function(item) {
                return parseInt(item, 10);
            });
            var selectedCountryInt = parseInt(selectedCountry, 10);

            if(gdprCountries !== 'undefined' && selectedCountry !== 'undefined' && gdprCountriesArray.includes(selectedCountryInt)){
                $(subscriptionCaptureBlockSelectors.gdprConsent).show();
            }
            else{
                $(subscriptionCaptureBlockSelectors.gdprConsent).hide();
                $(subscriptionCaptureBlockSelectors.gdprErrorMessage).hide();
            }
            var $form = $(subscriptionCaptureBlockSelectors.form);
                var $submitButton = $(subscriptionCaptureBlockSelectors.submitButton);
                var $gdprCountries =  $(subscriptionCaptureBlockSelectors.gdprCountries);
                var $countryDropdown = $(subscriptionCaptureBlockSelectors.countryDropdown);
                var $gdprConsent = $(subscriptionCaptureBlockSelectors.gdprAccept);

                enableSubmitButton($form, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent);
        });

        $(subscriptionCaptureBlockSelectors.gdprDecline).on("click", function () {
            $(subscriptionCaptureBlockSelectors.submitButton).prop("disabled", true);
            $(subscriptionCaptureBlockSelectors.gdprErrorMessage).show();
            $(subscriptionCaptureBlockSelectors.gdprChange).show();
            $(subscriptionCaptureBlockSelectors.gdprConsent).hide();
        });

        $(subscriptionCaptureBlockSelectors.gdprChange).on("click", function () {
            $(subscriptionCaptureBlockSelectors.submitButton).prop("disabled", true);
            $(subscriptionCaptureBlockSelectors.gdprErrorMessage).hide();
            $(subscriptionCaptureBlockSelectors.gdprChange).hide();
            $(subscriptionCaptureBlockSelectors.gdprConsent).show();
        });

        $(subscriptionCaptureBlockSelectors.gdprAccept).on("click", function(){
                var $form = $(subscriptionCaptureBlockSelectors.form);
                var $submitButton = $(subscriptionCaptureBlockSelectors.submitButton);
                var $gdprCountries =  $(subscriptionCaptureBlockSelectors.gdprCountries);
                var $countryDropdown = $(subscriptionCaptureBlockSelectors.countryDropdown);
                var $gdprConsent = $(subscriptionCaptureBlockSelectors.gdprAccept);

                enableSubmitButton($form, $submitButton, $gdprCountries, $countryDropdown, $gdprConsent);
                $(subscriptionCaptureBlockSelectors.gdprErrorMessage).hide();
        });

        $(subscriptionCaptureBlockSelectors.submitButton).click(
            function(e) {
                e.preventDefault();
                var $form = $(subscriptionCaptureBlockSelectors.form);
                var $submitSection = $(subscriptionCaptureBlockSelectors.submitSection);
                var $completedMessageSection = $(subscriptionCaptureBlockSelectors.completedMessageSection);
                var $errorMessageSection = $(subscriptionCaptureBlockSelectors.errorMessageSection);
                var postUrl = $form.attr("action");

                $errorMessageSection.fadeOut("fast");
                $completedMessageSection.fadeOut("fast");

                $.post(postUrl,
                    $form.serialize(),
                    function(response) {
                        $submitSection.fadeOut("fast");

                        if (response.result === "success") {
                            $completedMessageSection.fadeIn("fast");
                            return;
                        }

                        $errorMessageSection.fadeIn("fast");

                    }).fail(function () {
                        $errorMessageSection.fadeIn("fast");
                    });
            });
    }

    function init($subscribeCaptureBlock) {
        if ($subscribeCaptureBlock.length === 0)
            return;

        var selectorId = Math.floor(Math.random() * (5000000000));
        $subscribeCaptureBlock.attr("id", selectorId);
        selectorId = "#" + selectorId + " ";

        var subscriptionCaptureBlockSelectors = {
            'form': selectorId + ".subscribe-form",
            'subscribeSection': selectorId + ".subscribe-section",
            'subscribeButton': selectorId + ".subscribe-button",
            'submitSection': selectorId + ".submit-section",
            'submitButton': selectorId + ".subscribe-submit-button",
            'completedMessageSection': selectorId + ".subscribe-completed-message",
            'errorMessageSection': selectorId + ".subscribe-error-message",
            'emailTextBox': selectorId + "#SubscribeCaptureItem_Email",
            'firstNameTextBox': selectorId + "#SubscribeCaptureItem_FirstName",
            'recaptcha': selectorId + ".g-recaptcha",
            'gdprCountries' : selectorId + "#gdprcountries",
            'countryDropdown' : selectorId + "#SubscribeCaptureItem_CountryID",
            'gdprConsent' : selectorId + "#gdprConsentSection",
            'gdprErrorMessage' : selectorId + "#gdprErrorMessage",
            'gdprAccept' : selectorId + "#gdprAccept",
            'gdprDecline': selectorId + "#gdprDecline",
            'gdprChange' : selectorId + "#gdprChange"
        };



        bindControls(subscriptionCaptureBlockSelectors);
    };

    return {
        init: init
    };
})(jQuery);

$(function () {
    var $subscribeCaptureBlocks = $('.subscribe-capture-block');

    if ($subscribeCaptureBlocks.length > 0 && !window.grecaptcha) {
        var $recaptcha = $('.g-recaptcha').first();
        var lang = $recaptcha.length > 0 ? $recaptcha.data('language') : 'en';
        var jsElm = document.createElement("script");
        jsElm.type = "application/javascript";
        jsElm.src = "https://www.google.com/recaptcha/api.js?hl=" + lang + "&render=explicit";
        document.body.appendChild(jsElm);
    }

    $subscribeCaptureBlocks.each(function (index, value) {
        subscriptionCaptureBlock.init($(value));
    });
});
