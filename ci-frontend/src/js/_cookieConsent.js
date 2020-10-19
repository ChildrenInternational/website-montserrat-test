// Cookie Compliancy
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) === arg)
            return "here";
        i = document.cookie.indexOf(" ", i) + 1;
        if (i === 0) break;
    }
    return null;
}
function testFirstCookie() {
    var visit = GetCookie("cookieCompliancyAccepted");
    if (visit === null) {
        $("#myCookieConsent").fadeIn(400); // Show warning
    }
}
$(document).ready(function () {
    $("#cookieButton").click(function () {
        console.log('Understood');
        var expire = new Date();
        expire.setMonth(expire.getMonth() + 6);
        document.cookie = "cookieCompliancyAccepted=here; expires=" + expire.toUTCString() + ";path=/";
        $("#myCookieConsent").hide(400);
    });
    testFirstCookie();
});
// Cookie Compliancy END
