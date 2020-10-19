(function ($) {
    $(function () {
        $(document).on("click", "#sponsorship-opt-in", function (e) {
            e.preventDefault();
            var optInButton = $(this);
            $.ajax({
				url: optInButton.data('url'),
				method: 'GET',
				dataType: 'html',
                cache: false
			}).success(function (data) {
                    $('.opt-in-wrap').hide();
				    $('.sponsorship-opt-in').show();
			});
        });
    });
    $(function () {
        $(document).on("click", "#sponsorship-opt-out", function (e) {
            e.preventDefault();
            $('.opt-in-wrap').hide();
			$('.sponsorship-opt-out').show();
        });
    });
})(jQuery);