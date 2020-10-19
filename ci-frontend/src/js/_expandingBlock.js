/*
Handles expanding / collapsing Expanding Block (Rich Text) blocks.
*/
(function ($) {
    $(function () {
        $('.expand-expanded-text.hidden').hide().removeClass("hidden");

        $(document).on('click', 'a[data-expand-toggle]', function (e) {
			e.preventDefault();

			var context = $(this).closest('.expand-context'),
				onToggleLink = context.find('[data-expand-toggle=on]'),
				offToggleLink = context.find('[data-expand-toggle=off]'),
				expandedText = context.find('.expand-expanded-text');

			var isExpanded = $(this).data('expandToggle') === 'on';

			expandedText.slideToggle({
                duration: 1000,
                start: function () {
                    if (onToggleLink.hasClass("sitemap") && isExpanded) {
                        $('html, body').animate({
                            scrollTop: $(this).offset().top
                        }, 1000);
                    }
                },
			    complete: function () {
			        onToggleLink.toggleClass('hidden', isExpanded);
			        offToggleLink.toggleClass('hidden', !isExpanded);
			    }
			});
		});

        $(document).on("click",
            "a[data-partial-expand-toggle]",
            function(e) {
                e.preventDefault();

                var $context = $(this).closest(".partial-expand-context"),
                    $onToggleLink = $context.find("[data-partial-expand-toggle=on]"),
                    $offToggleLink = $context.find("[data-partial-expand-toggle=off]"),
                    $expandedText = $context.find(".partial-expand-text");

                var isExpanded = $(this).data("partial-expand-toggle") === "on";

                if ($onToggleLink.hasClass("sitemap") && isExpanded) {
                    $("html, body").animate({
                            scrollTop: $(this).offset().top
                        },
                        1000);
                }

                if ($expandedText.hasClass("partial-expanded")) {
                    var originalHeight = $expandedText.data("original-height");
                    $expandedText.animate({
                            height: originalHeight
                        },
                        1000,
                        function() {
                            $(this).removeClass("partial-expanded");
                            $onToggleLink.toggleClass("hidden", isExpanded);
                            $offToggleLink.toggleClass("hidden", !isExpanded);
                            $expandedText.css("height", "");
                        });
                } else {
                    var currentHeight = $expandedText.height();
                    var autoHeight = $expandedText.css("height", "auto").height();
                    $expandedText.data("original-height", currentHeight);
                    $expandedText.height(currentHeight).animate({
                            height: autoHeight
                        },
                        1000,
                        function() {
                            $(this).addClass("partial-expanded");
                            $onToggleLink.toggleClass("hidden", isExpanded);
                            $offToggleLink.toggleClass("hidden", !isExpanded);
                            $expandedText.css("height", "");
                        });
                }

            });
    });
})(jQuery);