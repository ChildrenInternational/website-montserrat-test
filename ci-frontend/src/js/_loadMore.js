/*
Handles ajaxifying Load More links.
*/
(function ($) {

	$(function() {
		$(document).on('click', 'a[data-load-more]', function (e) {
			e.preventDefault();
			var self = $(this);

			$.ajax({
				url: self.data('loadMore'),
				method: 'GET',
				dataType: 'html',
                cache: false
			}).success(function (data) {
				var context = self.closest('.js-load-more-context');
				if (context.length > 0)
			    	context.replaceWith(data);
			   	else
				    self.replaceWith(data);

			    if (userLikes)
			        userLikes.updateVisibleLikes();
			});
		});
	});
})(jQuery);

