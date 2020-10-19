

// Show / hide pledge form
(function (window) {
    $(document).ready(function () {
        PopUpAlerts();

        $(".alert.alert-dismissible").each(function(index, el){
            var $element = $(el);
            var timeout = $element.data("timeout");

            if($element.data("found-cookie") === "False"){
                if(timeout > 0){
                    setTimeout(function(){
                        $element.show();
                    }, timeout * 1000);
                }
                else{
                    $element.show();
                }
            }
        });

        // Removes right padding that gets added by modal alerts
        $('body').attr("style", "");

        $('.modal-body:last a[data-cookieid]').click(function () {
            var id = $('.modal-body a:first').data('cookieid');
            var href = $(this).attr('href');

            if (id != null) {
                $.ajax({
                    url: '/Alert/Hide/' + id,
                    method: 'GET',
                    dataType: 'html'
                }).done(function () {
                    window.location.href = href;
                });
            }
        });
      
        // Display next modal on hide
        $(document).on('hide.bs.modal', '.modal.alert', function (e) {
            var closeBtn = $(".close", e.target);
            var nextAlert = closeBtn.data("next");
            
            if (nextAlert != undefined && getCookie("Alerts") === null) {
                $(nextAlert).modal("show");
            }
            if(nextAlert != undefined && getCookie("Alerts") !== null && $(nextAlert).data("showinnavigation") === true){
                $(nextAlert).modal("show");
            }
            // Add alert to cookie
            HideAlert(closeBtn.data("cookieid"));
        });

        // Add alert to cookie
        $(".alert.alert-dismissible").on("click", ".close", function () {
            HideAlert($(this).data("cookieid"));
            $(this).closest(".alert.alert-dismissible").hide();
        });
    });

$(function() {
    $(document).on('click','a.js-show-alert-button', function(e){
        e.preventDefault();
        var navigationPopUpAlerts = $('*[data-showinnavigation="true"]');
        navigationPopUpAlerts.each(function(index, el){
        $(el).addClass("alert");

            if (index + 1 < navigationPopUpAlerts.length) {
                var nextEl = navigationPopUpAlerts.eq(index + 1);
                var thisCloseBtn = el.getElementsByClassName("close")[0];

                if (thisCloseBtn !== undefined) {

                    thisCloseBtn.setAttribute("data-next", "#" + nextEl.attr("id"));

                }
            }

            if (index == 0) {
                $(el).modal("show");
            }
        });

        $('*[data-showinabovenavigation="true"]').show();

      });
    });

    //Display Pop Up Alerts
    function PopUpAlerts() {
        var popUpAlerts = $(".modal.alert");
        popUpAlerts.each(function (index, el) {
            if (index + 1 < popUpAlerts.length) {
                var nextEl = popUpAlerts.eq(index + 1);
                var thisCloseBtn = el.getElementsByClassName("close")[0];

                if (thisCloseBtn !== undefined) {
                    thisCloseBtn.setAttribute("data-next", "#" + nextEl.attr("id"));
                }
            }

            if (index == 0) {
                var $element = $(el);
                var timeout = $element.data("timeout");
                if(timeout > 0){
                    setTimeout(function(){
                        $element.modal("show");
                    }, timeout * 1000);
                }
                else{
                    $element.modal("show");
                }
            }
        });
    }

    // Add alerts to Alert cookie
    function HideAlert(id) {
        if (id != null) {
            $.ajax({
                url: '/Alert/Hide/' + id,
                method: 'GET',
                dataType: 'html'
            });


        }
    }

}(window));

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURIComponent(dc.substring(begin + prefix.length, end));
} 



