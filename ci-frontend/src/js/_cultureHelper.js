CultureHelper = (function () {

    var getCurrentCulture = function () {
        var paths = location.pathname.split('/');
        if (paths.length < 2)
            return 'en';

        if (paths[1] == 'es')
            return 'es';

        return 'en';
    };

    var getUrl = function (url) {
        var currentCulture = getCurrentCulture()
        if (currentCulture == "en")
            return url;

        return "/" + currentCulture + url;
    };

    return {
        getCurrentCulture: getCurrentCulture,
        getUrl: getUrl
    };
})();