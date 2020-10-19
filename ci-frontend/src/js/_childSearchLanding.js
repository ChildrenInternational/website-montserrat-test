/*
Code related to the Child Search Landing page
*/
(function($) {

    $(function() {
        // Toggle Box/Image Overlay
        $(document).on("click", ".child-search-overlay",
            function(e) {
                e.preventDefault();
                var $this = $(this);
                var $thisParent = $this.parent();
                var childInfoModal = $this.closest(".person-actions").siblings(".overlay:hidden");
                if (childInfoModal.length) {
                    var childInfo = childInfoModal.find(".child-detail-info");
                    $.ajax({
                        url: childInfo.data("url"),
                        method: 'GET',
                        dataType: 'html',
                        cache: false
                    }).success(function (data) {
                        childInfo.html(data);
                    });
                }
                $thisParent.prev(".overlay").slideToggle();
                $thisParent.toggleClass("toggle");
            }
        );

        // Child Search Form Functions

        // Function to get the AgeGroups query string value if it exists.
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        //Make sure mobile checkboxes matches the selected AgeGroup if it exists.
        $( document ).ready(function() {
            var ageGroupQuery = getParameterByName("MultipleAgeGroups");

            if(ageGroupQuery !== null){
                $("input[name^='MultipleAgeGroupsM']").each(function(){
                    if($(this).val() === ageGroupQuery){
                        $(this).prop('checked', true);
                    }
                })
            }
        });

        //Mirror Desktop and Mobile checkbox selections.

        $("input[name^='MultipleAgeGroups']").change(function(){
            var $otherCheckboxes = $("input[name^='MultipleAgeGroups'][value='" + this.value + "']").not(this);
            $otherCheckboxes.prop('checked', $(this).prop('checked'));
        });

        //Un-check the all countries checkbox if any other checkbox is selected.

        $("#country-checkboxes").on("change", ":input:checkbox", function(){
            var defaultCheckbox = document.getElementById("any-country");
            if(this !== defaultCheckbox && defaultCheckbox.checked){
                defaultCheckbox.checked = false;
            }
            else if(this === defaultCheckbox && defaultCheckbox.checked){
                $("#country-checkboxes :input:checkbox").each(function(){
                    if(this !== defaultCheckbox){
                        $(this).attr('checked', false);
                    }
                })
            }
        })

        //Un-check the all ageGroup checkboxes if any other checkbox is selected.

        $("#ageGroup-checkboxes").on("change", ":input:checkbox", function(){
            var defaultCheckbox = document.getElementById("any-ageGroup");
            if(this !== defaultCheckbox && defaultCheckbox.checked){
                defaultCheckbox.checked = false;
            }
            else if(this === defaultCheckbox && defaultCheckbox.checked){
                $("#ageGroup-checkboxes :input:checkbox").each(function(){
                    if(this !== defaultCheckbox){
                        $(this).attr('checked', false);
                    }
                })
            }
        })

        //Ensure empty filters aren't appended to the URL.
        var getQueryStringValues = function($form) {
            var queryStringArray = [];
            var checkboxNames = [];

            $form.find(":input:checkbox").each(function() { checkboxNames.push($(this).attr("name")); });

            $form.find(":input").each(function() {
                var $elem = $(this);
                var val = $elem.val();
                var type = this.type;
                var name = $elem.attr("name");
                var item = {}
                if(type === "checkbox" && name === "MultipleAgeGroupsM"){
                    return true;
                }else if (type === "checkbox" && $elem.prop("checked") && val !== "on" && val !== "") {
                    item.name = name;
                    item.value = val;
                    queryStringArray.push(item);
                } else if ((type === "hidden" && val === "false" && checkboxNames.length > 0 && checkboxNames.indexOf(name) > -1)) {
                    return true;
                }else if(type === "checkbox" && !$elem.prop("checked")){
                    return true;
                }else if(type === "radio" && !$elem.prop("checked")){
                    return true;
                }else if (val !== "") {
                    item.name = name;
                    item.value = val;
                    queryStringArray.push(item);
                }
                return true;
            });
            var item = {}
            item.name = "search";
            item.value = true;
            queryStringArray.push(item);
            return $.param(queryStringArray);
        };

        $(".js-go-btn-child-search").on("click", function(e) {
            e.preventDefault();

            var $this = $(this);
            var $form = $this.closest("form");

            var actionUrl = $form.attr("action");
            var queryStringArray = getQueryStringValues($form);

            window.location.href = actionUrl + "?" + queryStringArray + "#child-results";
        });

        $(".section-child-search-compact-form .js-go-btn-child-search").on("click", function (e) {
            var $this = $(this);
            var $form = $this.closest("form");

            $form[0].reset();  // Reset all form data
        });
        
        // If a user has a form input element selected and hits enter the form will submit.
        $(".section-child-search-form input").keypress( function(e) {
            if(e.which === 13){
            e.preventDefault();

            var $section = $(".section-child-search-form");
            var $form = $section.find("form");

            var actionUrl = $form.attr("action");
            var queryStringArray = getQueryStringValues($form);

            window.location.href = actionUrl + "?" + queryStringArray + "#child-results";
            }
        });
    });
})(jQuery);

(function ($) {
    //Sponsorships
    var addToListSelectors = {
        'root': ".person-card",
        'submit': ".section-child-search .person-card .btn-add-list",
        'childIdentifier': 'input[name="childIdentifier"]',
        'amount': 'input[name="sponsorshipAmount"]',
        'description': 'input[name="sponsorshipDescription"]',
        'productOptionId': 'input[name="sponsorshipTypeIdentifier"]',
        'destination': 'input[name="checkoutDestination"]',
        'goToModal': 'input[name="goToModal"]',
        'goToCheckoutPage': 'input[name="goToCheckoutPage"]',
        'goToDetailPage': 'input[name="goToDetailPage"]'
    };

    $(function () {
        $(document).on("click", addToListSelectors.submit, function (e) {
            e.preventDefault();
            var elem = $(this);
            var parent = elem.closest(addToListSelectors.root);
            var childIdentifier = parent.find(addToListSelectors.childIdentifier).val();
            var amount = parent.find(addToListSelectors.amount).val();
            var cartDescription = parent.find(addToListSelectors.description).val();
            var productOptionId = parent.find(addToListSelectors.productOptionId).val();
            var destination = parent.find(addToListSelectors.destination).val();
            var goToModal = parent.find(addToListSelectors.goToModal).val();
            var goToDetailPage = parent.find(addToListSelectors.goToDetailPage).val();
           
            if(goToDetailPage){
                window.location = destination;
            }
            else{
                Cart.addToCart(amount, productOptionId, cartDescription, childIdentifier)
                .done(function() {
                    if (goToModal) {
                        Cart.openCartModal();
                    } else {
                        window.location = destination;
                    }
                });
            }
            
        });
    });
})(jQuery);

(function ($) {
    //Influencer Sponsorships
    var addToListSelectors = {
        'root': ".child-detail-modal",
        'submit': ".child-detail-modal .person-card .btn-add-list",
        'childIdentifier': 'input[name="childIdentifier"]',
        'amount': 'input[name="sponsorshipAmount"]',
        'description': 'input[name="sponsorshipDescription"]',
        'productOptionId': 'input[name="sponsorshipTypeIdentifier"]',
        'destination': 'input[name="checkoutDestination"]',
        'influencerID': 'input[name="inluencerRSID"]',
        'influencerController': 'input[name="influencerController"]'
    };

    $(function () {
        $(document).on("click", addToListSelectors.submit, function (e) {
            e.preventDefault();
            var elem = $(this);
            var parent = elem.closest(addToListSelectors.root);
            var childIdentifier = parent.find(addToListSelectors.childIdentifier).val();
            var amount = parent.find(addToListSelectors.amount).val();
            var cartDescription = parent.find(addToListSelectors.description).val();
            var productOptionId = parent.find(addToListSelectors.productOptionId).val();
            var destination = parent.find(addToListSelectors.destination).val();
            var influencerActionHref = parent.find(addToListSelectors.influencerController).val();

            $.ajax({
				url: influencerActionHref,
				method: 'GET',
				dataType: 'html',
                cache: false
			});

            Cart.addToCart(amount, productOptionId, cartDescription, childIdentifier)
                .done(function() {
                    window.location = destination;
                });
        });
    });
})(jQuery);

(function ($) {
	$(function() {
		$(document).on('click', 'a[data-load-more-sponsors]', function (e) {
			e.preventDefault();
			var parent = $(this).parent();

			$.ajax({
				url: $(this).attr('href'),
				method: 'GET',
				dataType: 'html',
                cache: false
			}).success(function (data) {
                parent.html(data);
			});
		});
	});
})(jQuery);



// Section - section-child-search-compact-form

(function ($) {
    function floatLabel(inputType) {
        $(inputType).each(function () {
            var $this = $(this);
            // on focus add class active to label
            $this.focus(function () {
                $this.next().addClass("active");
            });
            //on blur check field and remove class if needed
            $this.blur(function () {
                if ($this.val() === '' || $this.val() === 'blank') {
                    $this.next().removeClass("active");
                }
            });
        });
    }
    // just add a class of "floatLabel to the input field!"
    floatLabel(".select-box");
})(jQuery);