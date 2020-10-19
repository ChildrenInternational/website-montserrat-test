/*
Code related to the Story Landing page
*/
(function ($) {
	$(function() {
		var context = $('#story-search-form');
		if (!context.length)
		    return;

		var toggleFilters = function () {
		    $(".toggle-filter").toggleClass('active');
		};

		// Toggle filter displays
		$('.toggle-filter', context).on('click', function (e) {
		    e.preventDefault();
		    toggleFilters();
			$('.select-filters', context).slideToggle('fast');
		});
		$('.toggle-sort', context).on('click', function(e) {
			e.preventDefault();
			$('.sort ul', context).slideToggle('fast');
		});

		var clickedOnScrollbar = function (mouseX) {
		    return $(window).outerWidth() <= mouseX;
		};

		$(document).on('mousedown', function (e) {
		    var elem = $(e.target);
		    var filters = $('.select-filters');
		    if (!clickedOnScrollbar(e.clientX) && !elem.hasClass('toggle-filter') && filters.is(':visible')) {
		        var isChildFilter = $.contains(filters.get(0), e.target);
		        
		        if (!isChildFilter) {
		            toggleFilters();
		            filters.slideToggle('fast');
		        }
		    }
		});

		// Apply selectIt to dropdowns
		var selectItOptions = {
		    isMobile: function () { return false }
		};

		// Category toggles
		$('.filter-by-section a', context).on('click', function (e) {
			e.preventDefault();
			var li = $(this).closest('li'),
				isSelected = li.is('.is-selected');
			li.toggleClass('is-selected', !isSelected);
			$(this).toggleClass('active', !isSelected);
		});

		//Function to select the most relevant suggestion then submit the form after a user hits enter.

		$('#Keywords').on('keyup', function (e) {
			if (e.which === 13) {
				if ($('#Keywords').val() !== $('ul.typeahead.dropdown-menu li.active a.dropdown-item').text()) {

					$('#Keywords').val($('ul.typeahead.dropdown-menu li:first a.dropdown-item').text());
				}
				else {
					$('#Keywords').val($('ul.typeahead.dropdown-menu li.active a.dropdown-item').text());
				}

				context.submit();
			}
		});

		// Get submit link to act like a submit button
		$('.js-go-btn', context).on('click', function (e) {
			e.preventDefault();

			context.submit();
		});

		var disableEmptyElements = function () {
		    context.find(":input").each(function () {
		        var elem = $(this);
		        var val = elem.val();
		        if (val == '') {
		            elem.prop('disabled', 'disabled');
		        }
		    });
		};

		// Catch submit to convert selected categories to inputs then submit
		context.on('submit', function (e) {
			$('.filter-by-section input', context).remove();

			$('.filter-by-section .is-selected', context).each(function () {
				var t = $(this),
					categoryId = t.data('categoryId');
				t.append($(document.createElement('input'))
					.attr('type', 'hidden')
					.attr('name', 'Categories')
					.val(categoryId));
			});

			disableEmptyElements();

			return true;
		});
		
	});


	$(function () {
		$('[data-type-ahead]').each(function (i) {
			var self = $(this),
				url = self.data('typeAhead');

			self.typeahead({
				source: function (q, process) {
					$.ajax({
						url: url,
						data: { q: q }
					}).done(function (data) {
						process(data);
					});
				}
			});
		});
		
	});

	
})(jQuery);