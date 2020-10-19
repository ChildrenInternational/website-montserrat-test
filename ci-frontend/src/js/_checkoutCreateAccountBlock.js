(function (window, document, $) {

    var ajaxUrl = '/api/User/CreateAccountWithPassword';

    var selectors = {
        root: '.checkout-createaccount-block',
        password: 'input[name="password"]',
        passwordValidationErrorMessage: '.passwordValidationErrorMessage',
        confirmPassword: 'input[name="confirmPassword"]',
        passwordsDontMatchEror: '.passwordsDontMatchEror',
        createAccountGeneralError: '.createAccountGeneralError',
        createAccountSubmitButton: '.createAccountSubmitButton',
        createAccount: '.checkout-createaccount-form',
        createSuccess: '.create-success',
        facebook: '.btn-facebook',
        twitter: '.btn-twitter',
        google: '.btn-google'
    };

    var isValidPassword = function (password) {
        return /^.{6,32}/.test(password);
    };

    var CultureHelper = (function(){

        var getCurrentCulture = function(){
            var paths = location.pathname.split('/');
            if (paths.length < 2)
                return 'en';

            if (paths[1] == 'es')
                return 'es';

            return 'en';
        };

        var getUrl = function(url) {
            var currentCulture = getCurrentCulture()
            if (currentCulture == "en")
                return url;

            return "/" + currentCulture + url;
        }

        return {
            getCurrentCulture: getCurrentCulture,
            getUrl: getUrl
        };
    })();

    var getOAuthUrl = function (providerName, afterOauthUrl) {
        var afterOauth = location.pathname + afterOauthUrl;
        var url = '/api/oauth2/login?providerName=' + providerName + '&afterOAuth=' + encodeURIComponent(afterOauth);
        return CultureHelper.getUrl(url);
    };

    var createWithOAuth = function (provider) {
        window.location.href = getOAuthUrl(provider, '#oauthcreate')
    };

    var createWithTwitter = function () {
        createWithOAuth('Twitter');
    };

    var createWithGoogle = function () {
        createWithOAuth('Google');
    };

    var createWithFacebook = function () {
        createWithOAuth('Facebook');
    };

    $(function () {
        var rootElem = $(selectors.root);

        var validate = function (passwordElem, confirmPasswordElem, parent) {
            var password = passwordElem.val();
            var confirmPassword = confirmPasswordElem.val();

            var valid = isValidPassword(password);
            var passwordErrorElem = parent.find(selectors.passwordValidationErrorMessage);

            if (valid === false) {
                passwordErrorElem.show();
            } else {
                passwordErrorElem.hide();
            }

            var submitButtonElem = parent.find(selectors.createAccountSubmitButton);

            var passwordsMatch = password === confirmPassword;

            var confirmPasswordErrorElem = parent.find(selectors.passwordsDontMatchEror);
            if (passwordsMatch === false) {
                confirmPasswordErrorElem.show();
            } else {
                confirmPasswordErrorElem.hide();

                if (valid) {
                    submitButtonElem.removeClass('btn-disabled').addClass('btn-green');
                } else {
                    submitButtonElem.removeClass('btn-green').addClass('btn-disabled');
                }
            }
        };

        var createAccountWithPassword = function (parentElem, password, confirmPassword) {
            var data = {
                password: password,
                confirmPassword: confirmPassword
            };

            var errorElem = parentElem.find(selectors.createAccountGeneralError);
            var successElem = parentElem.find(selectors.createSuccess);
            var formElem = parentElem.find(selectors.createAccount);

            $.ajax({
                type: "POST",
                //the url where you want to sent the userName and password to
                url: ajaxUrl,
                dataType: 'json',
                contentType: 'application/json',
                //json object to sent to the authentication url
                data: JSON.stringify(data),
                success: function () {
                    successElem.show();
                    errorElem.hide();
                    formElem.hide();
                },
                error: function () {
                    errorElem.show();
                    successElem.hide();
                }
            });
        };

        rootElem.find(selectors.password).on('keyup', function (e) {
            var passwordElem = $(this);
            var parent = passwordElem.parents(selectors.root);
            
            var confirmPasswordElem = parent.find(selectors.confirmPassword);
            return validate(passwordElem, confirmPasswordElem, parent);
        });

        rootElem.find(selectors.confirmPassword).on('keyup', function (e) {
            var confirmPasswordElem = $(this);
            var parent = confirmPasswordElem.parents(selectors.root);
            var passwordElem = parent.find(selectors.password);

            return validate(passwordElem, confirmPasswordElem, parent);
        });

        rootElem.on('click', selectors.createAccountSubmitButton, function (e) {
            e.preventDefault();

            var submitButton = $(this);
            var parent = submitButton.parents(selectors.root);
            var passwordElem = parent.find(selectors.password);
            var password = passwordElem.val();
            if (!isValidPassword(password))
                return false;

            var confirmPasswordElem = parent.find(selectors.confirmPassword);
            var confirmPassword = confirmPasswordElem.val();
            if (password !== confirmPassword)
                return false;

            createAccountWithPassword(parent, password, confirmPassword);
        });

        rootElem.on('click', selectors.facebook, function (e) {
            e.preventDefault();

            createWithFacebook();
        });

        rootElem.on('click', selectors.google, function (e) {
            e.preventDefault();

            createWithTwitter();
        });

        rootElem.on('click', selectors.google, function (e) {
            e.preventDefault();

            createWithGoogle();
        });
    });

})(window, document, jQuery);