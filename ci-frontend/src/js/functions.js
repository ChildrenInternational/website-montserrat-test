$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*
 * windowSize
 * call this function to get windowSize any time
 */
function windowSize() {
    windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
    windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
}

//Init Function of init it wherever you like...
windowSize();

// Get window size on window resize for Mobile background image
function CurrentWindowSize() {
    windowSize();

    const hasMobileImg = document.querySelectorAll('.section-hero-home, .section-hero-landing, .section-hero-landing-block, .full-bg-image');
    for (var i = 0; i < hasMobileImg.length; i++) {
        //console.log('Image: ', hasMobileImg[i]);

        if (windowWidth < 480) {
            //console.log('Less than 480px !');
            $(hasMobileImg[i]).css("background-image", "url(" + $(hasMobileImg[i]).attr("data-img-m") + ")");
        }
        else {
            //console.log('More than 480');
            $(hasMobileImg[i]).css("background-image", "url(" + $(hasMobileImg[i]).attr("data-img") + ")");
        }

    }


    //console.log('width is :', windowWidth, 'Height is :', windowHeight);
    var hasBGimage = document.querySelectorAll('.full-bg-image-src');
    if (windowWidth < 480) {
        //console.log('Less than 480px !');
        $(hasBGimage).attr("src", "" + $(hasBGimage).attr("data-img-m") + "");
    }
    else {
        //console.log('More than 480');
        $(hasBGimage).css("src", "" + $(hasBGimage).attr("data-img") + "");
    }


}

$(document).ready(function () {
    CurrentWindowSize();//run when page first loads
});

$(window).resize(function () {
    CurrentWindowSize();//run on every window resize
});

//object - fit - images
(function () {
    var homepageElems = document.querySelectorAll('.homepage');
    if (homepageElems.length > 0)
        return;

    if ('objectFit' in document.documentElement.style === false) {
        var container = $('.section-hero:not(.bg-image-wrap)');
        container.each(function (i) {
            var elem = $(this);
            var image = elem.find('img.bg-image');
            var imageSrc = image.attr('src');
            image.hide();
            elem.css({
                'background-size': 'cover',
                'background-image': 'url(' + imageSrc + ')',
                'background-position': 'center center'
            });
        });

        var imgToFit = document.querySelectorAll('img.bg-image, img.lg-featured-image, .slider-thumbnail img');

        for (var i = 0; i < imgToFit.length; i++) {
            var Imgcontainer = imgToFit[i]
            var imgToFitUrl = imgToFit[i].src;

            if (imgToFitUrl) {
                Imgcontainer.classList.add('no-object-fit');
                Imgcontainer.style.backgroundImage = 'url(' + imgToFitUrl + ')';
                Imgcontainer.src = '';
                Imgcontainer.alt = '';
            }
        }
    }
})();

// Tooltip
$(function () {
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
});

// Header Search Bar
(function ($) {

    var selectors = {
        searchContainer: '.search-container',
        searchTrigger: '.search-trigger',
        searchInput: '.search-input',
        header: '.header'
    };

    $(function () {
        var root = $(selectors.searchContainer);
        var header = $(selectors.header);
        // register clicks and toggle classes

        root.on("click", selectors.searchTrigger, function (e) {
            e.preventDefault();

            var elem = $(this);
            var parent = elem.parent(selectors.searchContainer);
            var searchInput = parent.find(selectors.searchInput);

            if (parent.hasClass('focus'))
            {
                if (parent.find(selectors.searchInput).val() !== '')
                {
                    parent.find('form').submit();
                }
                parent.removeClass('focus');
                elem.removeClass('active');
                header.removeClass('focus');
            } else {
                parent.addClass('focus');
                elem.addClass('focus');
				header.addClass('focus');
				searchInput.attr("value", "");
                searchInput.focus();
            }
        });

        $(document).on('click', function (e) {
            var elem = $(e.target);
            var isSearchElement = $.contains(root.get(0), e.target);
            if (!isSearchElement && root.hasClass('focus')) {
                root.removeClass('focus');
                root.find(selectors.searchTrigger).removeClass('active');
                header.removeClass('focus');
            }
        });
    });
})(jQuery);

// Mobile Search Toggle
$('.mobile-search-trigger').click(function () {
    $('.mobile-search-container').slideToggle('fast');
});

// Header changes
(function ($) {
    var stoppedScrollTop = 0,
        lastScrollTop = 0,
        windowElem = $(window),
        siteHeader = $('.header'),
        hiddenHeader = $('.hidden-header'),
        affixTop = 120,
        currentPosition = 0,
        threshold = 70,
        headerScrollEnabled = true;

    var getScrollTop = function () {
        return windowElem.scrollTop();
    };

    var getHiddenPosition = function () {
        return -siteHeader.outerHeight();
    };

    var setHiddenHeaderHeight = function (maybeHeight) {
        var position = siteHeader.css('position');
        if(position === "relative")
        {
            hiddenHeader.css({ 'height': '0px' });
            return;
        }
        var fullHeight = siteHeader[0].scrollHeight;
        hiddenHeader.css({ 'height': fullHeight + 'px' });
    };

    var hideMenu = function () {
        var currentScrollTop = getScrollTop();
        lastScrollTop = currentScrollTop;
        stoppedScrollTop = currentScrollTop;
        siteHeader.css({ 'top': '0px' });
        siteHeader.removeClass('affix');
        setHiddenHeaderHeight();
    };

    var setCurrent = function (current) {
        currentPosition = current;

        if (currentPosition > 0) {
            setCurrent(0);
            return;
        }

        var hiddenPosition = getHiddenPosition();

        if (currentPosition < hiddenPosition) {
            setCurrent(hiddenPosition);
        }
    };

    var setPosition = function (position) {
        var scrollTop = getScrollTop();

        if (position === 0 && scrollTop === 0) {
            siteHeader.css({ 'top': '0px' });
            siteHeader.removeClass('affix');
            setHiddenHeaderHeight();
            return;
        }

        if (position === 0) {
            //'transform': 'translate3d(0px, 0px, 0px)', 
            siteHeader.css({ 'top': '0px' });
            siteHeader.addClass('affix');
            setHiddenHeaderHeight();
            return;
        }

        //'transform': 'translate3d(0px,' + position + 'px, 0px)', 
        siteHeader.css({ 'top': position + 'px' });
        siteHeader.addClass('affix');
        setHiddenHeaderHeight();
    };

    var down = function (scrollTop) {
        var hiddenPosition = getHiddenPosition();
        setCurrent(-scrollTop);
        setPosition(-scrollTop);
    };

    var ensureVisible = function (scrollTop) {
        if (scrollTop >= affixTop)
            return;
        
        setPosition(0);
    };

    var up = function (scrollTop) {
        ensureVisible(scrollTop);
        if (currentPosition == 0)
            return;

        var distanceMoved = stoppedScrollTop - scrollTop;
        var hiddenPosition = getHiddenPosition();
        //console.log({
        //    currentPosition: currentPosition,
        //    lastScrollTop: lastScrollTop,
        //    scrollTop: scrollTop,
        //    newCurrentPosition: currentPosition + lastScrollTop - scrollTop,
        //    stoppedScrollTop: stoppedScrollTop,
        //    distanceMoved: distanceMoved,
        //    hiddenPosition: hiddenPosition
        //})

        if (distanceMoved < threshold && currentPosition == hiddenPosition)
            return;

        setCurrent(currentPosition + lastScrollTop - scrollTop);
        setPosition(currentPosition);
    };

    var disableHeaderFor = function (timeout) {
        headerScrollEnabled = false;
        hideMenu();
        
        setTimeout(function () {
            hideMenu();
            headerScrollEnabled = true;
        }, timeout);
    };

    $(function () {
        windowElem.on('disableHeaderScroll', function (e, timeout) {
            disableHeaderFor(timeout);
        });

        windowElem.scroll(function () {
            if (!headerScrollEnabled)
            {
                return;
            }

            var currentScrollTop = getScrollTop();

            if (currentScrollTop === 0) {
                setCurrent(0);
                setPosition(0);
            }
            else if (currentScrollTop > lastScrollTop && currentScrollTop >= affixTop ) {
                down(currentScrollTop);
            }
            else if (currentScrollTop <= lastScrollTop) {
                up(currentScrollTop);
            }

            lastScrollTop = currentScrollTop;

            setTimeout(function () {
                var current = getScrollTop();
                if (current === currentScrollTop)
                {
                    stoppedScrollTop = current;
                }
            }, 100);
        });
    });
})(jQuery);

window.ScrollHelper = (function () {

    var isElementInViewport = function (el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    };


    var scrollToElement = function (elem, complete, predicate) {
        if (!elem)
            return;

        var windowElem = $(window);
        var headerElem = $('header');

        if (isElementInViewport(elem.parentElement))
            return;

        if (predicate && !predicate()) {
            return;
        }

        var disableHeaderScrollTimeout = this.animationTime * 2 + 100;
        windowElem.trigger('disableHeaderScroll', [disableHeaderScrollTimeout]);

        var currentScrollTop = windowElem.scrollTop();
        var elemTop = $(elem).parent().offset().top;

        var headerOffset = headerElem.height();

        var offset = -(headerOffset);
        var scrollTop = elemTop + offset;

        $("html, body").animate({ scrollTop: scrollTop, complete: complete }, this.animationTime);
    };

    return {
        scrollToElement: scrollToElement
    };
})();

// Mobile Menu
$(document).ready(function() {

    var nav = $("#mobile-nav");
    nav.mmenu({
        navbar: {
            title: '',
            titleLink: 'parent'
        },
        navbars: {
            content: ["prev", "title"]
        },
        extensions: ["fullscreen", "border-full"],

        offCanvas: {
            position: 'right',
            zposition: 'front'
        }
    });

    $('body').on('click', '.mm-open', function(e) {
        e.preventDefault();
        nav.data('mmenu').open();
    });

    $('body').on('click', '.mm-close', function (e) {
        e.preventDefault();
        nav.data('mmenu').close();
    });

    // Hide header and scroll top button when modal is opened
    $('.modal').on('show.bs.modal', function () {
        $('header.header').addClass("hidden");
        $('.scroll-top-wrapper').removeClass("show");
    });
    // Display header and scroll top button when modal is closed
    $('.modal').on('hide.bs.modal', function () {
        $('header.header').removeClass("hidden");
        $('.scroll-top-wrapper').addClass("show");
    });
});

// Carousel/Slider

$('.carousel-ma-addphoto').slick({
    slidesToShow: 5,
    slidesToScroll: 4,
    infinite: true,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    easing: 'swing',
    variableWidth: true,
    prevArrow: '<button type="button" class="slick-prev / btn / green"><span class="sr-only">Previous</span><i class="icon-arrow-cta / white"></i></button>',
    nextArrow: '<button type="button" class="slick-next / btn / green"><span class="sr-only">Next</span><i class="icon-arrow-cta / white"></i></button>',
    responsive: [
    {
        breakpoint: 992,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            centerMode: true
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            arrows: false,
            infinite: true,
            centerMode: true
        }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
    ]
});
 $('.slider.carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    dots: false,
    prevArrow: '<button type="button" class="slick-prev / btn / green"><span class="sr-only">Previous</span><i class="icon-arrow-cta / white"></i></button>',
    nextArrow: '<button type="button" class="slick-next / btn / green"><span class="sr-only">Next</span><i class="icon-arrow-cta / white"></i></button>',
    adaptiveHeight: true,
    asNavFor: '.carousel-nav'
 });
$('.carousel-nav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.slider.carousel',
    dots:true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev / btn / green"><span class="sr-only">Previous</span><i class="icon-arrow-cta / white"></i></button>',
    nextArrow: '<button type="button" class="slick-next / btn / green"><span class="sr-only">Next</span><i class="icon-arrow-cta / white"></i></button>',
    appendDots: '.carousel-nav-dots',
    centerMode: false,
    focusOnSelect: true,
    easing: 'swing',
    responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        infinite: true      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        arrows: false,
        centerMode: true
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$(document).ready(function () {
    var getClass = function (parentSelector, classSelector) {
        return $(parentSelector).find(classSelector).length > 0 ? classSelector : undefined
    };

    var getClassForParent = function (parent, classSelector) {
        return parent.find(classSelector).length > 0 ? classSelector : undefined
    };

    var swiperOnPaginationRendered = function (elem) {
        return function (swiper, paginationContainer) {
            var next = elem.find('.swiper-button-next');
            var previous = elem.find('.swiper-button-prev');
            var paging = elem.find('.swiper-pagination');

            if (swiper.bullets.length === 1) {
                next.hide();
                previous.hide();
                paging.hide();
                elem.addClass("no-paging");
            } else {
                next.show();
                previous.show();
                paging.show();
                elem.removeClass("no-paging");
            }
        };
    };


    var setupGalleryCard = function (elem) {

        //initialize swiper when document ready  
        var galleryCard = new Swiper(elem, {
            // Optional parameters
            nextButton: getClassForParent(elem, '.swiper-button-next'),
            prevButton: getClassForParent(elem, '.swiper-button-prev'),
            pagination: getClassForParent(elem, '.swiper-pagination'),
            paginationClickable: true,
            simulateTouch: false,
            onPaginationRendered: swiperOnPaginationRendered(elem),
            onTransitionEnd: function() {  $(document).trigger('swiperTransitionEnd'); },
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 20
                },
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                }
            }
        });
    };

    var setupGalleryCardOne = function (elem) {
        var galleryCardOne = new Swiper(elem, {
            // Optional parameters
            nextButton: getClassForParent(elem, '.swiper-button-next'),
            prevButton: getClassForParent(elem, '.swiper-button-prev'),
            pagination: getClassForParent(elem, '.swiper-pagination'),
            paginationClickable: true,
            simulateTouch: false,
            onPaginationRendered: swiperOnPaginationRendered(elem),
            onTransitionEnd: function() {  $(document).trigger('swiperTransitionEnd'); },
            autoHeight: true,
            slidesPerView: 1,
            spaceBetween: 80,
        });
    };
    var setupGalleryNote = function (elem) {
        var galleryNote = new Swiper(elem, {
            // Optional parameters
            autoHeight: true,
            simulateTouch: false,
            spaceBetween: 30,
        });
    };

    var container = $('.swiper-container');
    //console.log(container);

    $('.swiper-container').each(function () {
        var elem = $(this);
        var isGalleryCardOne = elem.hasClass('gallery-card-one')
        var isGalleryNote = elem.hasClass('gallery-note')
        var isGallery = elem.hasClass('gallery-card')

        if (!isGalleryCardOne && !isGallery && !isGalleryNote) {
            return;
        }

        if (isGallery) {
            setupGalleryCard(elem);
            return;
        }

        if (isGalleryCardOne) {
            setupGalleryCardOne(elem);
            return;
        }

        if (isGalleryNote) {
            setupGalleryNote(elem);
            return;
        }

    });

    $('.carousel-block').each(function () {
        var elem = $(this);
        var top = elem.find('.gallery-top');
        var thumbs = elem.find('.gallery-thumbs');

        var galleryTop = new Swiper(top, {
            // Optional parameters
            nextButton: getClassForParent(top, '.swiper-button-next'),
            prevButton: getClassForParent(top, '.swiper-button-prev'),
            pagination: getClassForParent(top, '.swiper-pagination'),
            slidesPerView: 1,
            centeredSlides: true,
            autoHeight: true,
            paginationClickable: true,
            simulateTouch: false,
            spaceBetween: 30
        });
        var galleryThumbs = new Swiper(thumbs, {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: true,
            simulateTouch: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    });

    

    var MscMymediaThumbs = new Swiper('.carousel-msc-mymedia', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slideToClickedSlide: true
    });

    //Donation Form Focus

    var $donationInput = $(".donation-form").find("input[value='$']").first();
    if($donationInput.length && $donationInput.val() === "$"){
        $donationInput.putCursorAtEnd();
    }
});

// Bootstrap Tabs
$('#myTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});


//DonationBlock
//Moved to DonationBlock.cshtml so we could make use of information in the model.

//RandomChildBlock
//This is only temporary functionality to assist with testing the checkout process.
(function($) {
    var selectors = {
        'childIdentifier': '.featured-child-childidentifier',
        'root': '.featured-child,.js-featured-child',
        'submit': '.featured-child-submit',
        'addtocart': '.featured-child-addtocart',
        'amount': '.featured-child-amount',
        'description': '.featured-child-description',
        'productOptionId': '.featured-child-productOptionId',
        'destination': '.destination-link'
    };

    $(function() {
        var root = $(selectors.root);
        root.on('click', selectors.submit, function(e) {
            var elem = $(this);
            var parent = elem.closest(selectors.root);
            var childIdentifier = parent.find(selectors.childIdentifier).val();
            var addtocart = parent.find(selectors.addtocart).val();
            var amount = parent.find(selectors.amount).val();
            var cartDescription = parent.find(selectors.description).val();
            var productOptionId = parent.find(selectors.productOptionId).val();
            var destination = parent.find(selectors.destination).prop('href');

            if (addtocart === 'false') {
                return;
            }

            e.preventDefault();

            Cart.addToCart(amount, productOptionId, cartDescription, childIdentifier)
                .done(function () {
                    window.location = destination;
                }).fail(function () {
                    console.log('failed: ');
                    console.log(arguments);
                });
        });
    });
})(jQuery);

//CheckoutReferralBlock
(function($) {
    var selectors = {
        'root': '.checkout-referral-block',
        'question': '.referral-form-question',
        'selectedMarketingChannel': '.selected-marking-channel',
        'additionalInfo': '.additional-info',
        'marketingComment': '.marketingComment',
        'submitUrl': '.submitUrl',
        'transactionReference': '.transactionReference',
        'submitMarketing': '.submitMarketing',
        'thankyou': '.referral-form-thank-you'
    };

    $(function() {
        var root = $(selectors.root);

        root.on('change', root.selectedMarketingChannel, function(e) {
            var elem = $(this);
            var parent = elem.closest(selectors.root);
            var selected = parent.find(selectors.selectedMarketingChannel).find(":selected");
            var info = selected.attr('data-info');
            var additionalInfo = info.toLowerCase();

            var infoElem = parent.find(selectors.additionalInfo);
            if (additionalInfo === "true") {
                infoElem.show(250);
            } else {
                infoElem.hide(250);
            }
        });

        root.on('click', selectors.submitMarketing, function(e) {
            e.preventDefault();
            var elem = $(this);
            var parent = elem.closest(selectors.root);
            var value = parent.find(selectors.selectedMarketingChannel).val();
            var additionalInfo = parent.find(selectors.marketingComment).val() || "";
            var url = parent.find(selectors.submitUrl).val();
            var reference = parent.find(selectors.transactionReference).val();
            var data = {
                transactionReference: reference,
                marketingChannelId: value,
                additionalInfo: additionalInfo
            };

            $.ajax({
                dataType: "json",
                type: "POST",
                url: url,
                data: data,
                success: function (returnData) {
                    if (returnData.success == true) {
                        parent.find(selectors.question).hide();
                        parent.find(selectors.thankyou).show();
                    }
                }
            });
        });
    });
})(jQuery);

//Confirm Modal
(function ($) {
    var selectors = {
        'root': '.confirm-modal',
        'body': '.modal-body p',
        'ok': '.modal-footer .ok-btn',
        'cancel': '.modal-footer .close-btn'
    };

    $(function () {
        var confirmModal = $(selectors.root);

        confirmModal.on('hide.bs.modal', function (e) {
            confirmModal.find(selectors.ok).off('click');
        });

        window.modalConfirm = function (message, callback) {
            confirmModal.find(selectors.body).html(message);
            confirmModal.find(selectors.ok).on('click', function (e) {
                e.preventDefault();
                confirmModal.modal('hide');
                if (callback) {
                    callback();
                }
            });

            confirmModal.modal('show');
        };
    });
})(jQuery);

// Map Callout close on click out

jQuery.fn.mouseIsOver = function () {
    return $(this).parent().find($(this).selector + ":hover").length > 0;
};

$(function() {
    $('.section-location-map').on('click', function() {
        $('.collapse').collapse('hide');
    });

    var allPanels = $('.collapse');
    var hideAll = function () {
        allPanels.collapse('hide');
    };

    $(".map-dot").parent().hover(function () {
        $this = $(this);
        $target = $this.find('.collapse');

        $target.collapse('show');
    }, function () {
        $this = $(this);
        $target = $this.find('.collapse');

        function hide() { 
            var isHovered = $this.mouseIsOver();
            console.log(isHovered)
            if (!isHovered) {
                $target.collapse('hide');
                return;
            }
            setTimeout(hide, 100)
        }

        setTimeout(hide, 1000)
       
        });
});




// Message Center mark As Read or mark As Deleted
var MessageCenter = (function () {

    var markAsRead = function (messageId, success) {
        $.post("/myci/api/message/markasread/" + messageId, success);
    };

    var markAsDeleted = function (messageId, success) {
        $.post("/myci/api/message/markasdeleted/" + messageId, success);
    };

    return {
        markAsRead: markAsRead,
        markAsDeleted: markAsDeleted
    };
})();

$(document).ready(function(){

    $(document).on('click', 'a[data-refresh]', function(e){
        e.preventDefault();

        var id = $(this).data("refresh");

        var context = $(this).closest('[class*="js-refresh-block"]');

        $.ajax({
            url: '/RandomChildBlock/AjaxIndex',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: "{'ID':'" + id + "'}",
            success: function (result) {
                $(context).replaceWith(result);
            }
        });
    });

    $(document).on('click', '.child-pagination-previous', childPaginatePreviousClickHandler);

    $(document).on('click', '.child-pagination-next', childPaginateNextClickHandler);

    function childPaginatePreviousClickHandler(e) {
        e.preventDefault();

        var $this = $(this);
        var $currentChild = $(this).siblings(".child-pagination-current")

        var currentBlock = $currentChild.data("current-block");
        var pageIndex = $this.data("child-pagination-previous");

        var context = $this.closest('.section-one-child-carousel');
        var currentLanguage = context.data("language");
        var url = "/OneChildFeatureBlock/Paginate";
        if(currentLanguage === "es"){
            url = "/es/OneChildFeatureBlock/Paginate"
        }
        if (pageIndex >= 0) {
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: "{'BlockID':'" + currentBlock + "', 'p':'" + pageIndex + "'}",
                success: function (result) {
                    context.replaceWith(result);
                }
            });
        }
    }

    function childPaginateNextClickHandler(e) {
        e.preventDefault();
        var $this = $(this);
        var $currentChild = $(this).siblings(".child-pagination-current")

        var currentBlock = $currentChild.data("current-block");
        var pageIndex = $this.data("child-pagination-next");

        var context = $this.closest('.section-one-child-carousel');
        var currentLanguage = context.data("language");
        var url = "/OneChildFeatureBlock/Paginate";
        if(currentLanguage === "es"){
            url = "/es/OneChildFeatureBlock/Paginate"
        }

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: "{'BlockID':'" + currentBlock + "', 'p':'" + pageIndex + "'}",
            success: function (result) {
                context.replaceWith(result);

            }
        });
    }

    $(document).on("click", ".feature-block-overlay",
            function(e) {
                e.preventDefault();
                var $this = $(this);
                var $thisParent = $this.parent();
                $thisParent.prev(".overlay").slideToggle();
                $thisParent.toggleClass("toggle");
            }
        );

        var addToListSelectors = {
            'root': ".section-one-child-carousel .child-wrap",
            'submit': ".section-one-child-carousel .child-wrap .featured-child-submit",
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
});

jQuery.fn.putCursorAtEnd = function() {

    return this.each(function() {
      
      var $el = $(this),
          el = this;
  
      if (!$el.is(":focus")) {
       $el.focus();
      }
      if (el.setSelectionRange) {
        var len = $el.val().length * 2;
        setTimeout(function() {
          el.setSelectionRange(len, len);
        }, 1);
      } else {
        $el.val($el.val());
      }
      this.scrollTop = 999999;
    });
};

// Table Responsive
var smallBreak = 991; // Your small screen breakpoint in pixels
var columns = $('.js-table-data tr').length;
var rows = $('.js-table-data th').length;


$(document).ready(function () {
    shapeTable();//run when page first loads for mobile page
});
$(window).resize(function () {
    shapeTable();//run when page is resized for mobile page
});

function shapeTable() {
    if ($(window).width() < smallBreak) {
        for (i = 0; i < rows; i++) {
            var maxHeight = $('.js-table-data th:nth-child(' + i + ')').outerHeight();
            for (j = 0; j < columns; j++) {
                if ($('.js-table-data tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight() > maxHeight) {
                    maxHeight = $('.js-table-data tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight();
                }
                if ($('.js-table-data tr:nth-child(' + j + ') td:nth-child(' + i + ')').prop('scrollHeight') > $('.js-table-data tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight()) {
                    maxHeight = $('.js-table-data tr:nth-child(' + j + ') td:nth-child(' + i + ')').prop('scrollHeight');
                }
            }
            for (j = 0; j < columns; j++) {
                $('.js-table-data tr:nth-child(' + j + ') td:nth-child(' + i + ')').css('height', maxHeight);
                $('.js-table-data th:nth-child(' + i + ')').css('height', maxHeight);
            }
        }
    } else {
        $('.js-table-data td, .js-table-data th').removeAttr('style');
    }
}


// Top Nav fix for ipad touch dropdown

$(function () {
    $('.navigation').doubleTapToGo();
});