(function($) {
	// Several "back to" links on the page only display
	// when that block is "focused" via a hash link.
	// Show/hide based on the current hash.
	function updateReturnToLinks() {
		$('[data-show-on-hash]').each(function () {
			var t = $(this),
					hash = location.hash;

			if (hash.length && hash[0] == '#') {
				hash = hash.substr(1, hash.length - 1); //#my-team -> my-team
			}

			t.toggle(hash.length && t.data('showOnHash') && t.data('showOnHash') == hash);
		});
	}

	$(updateReturnToLinks);
	$(window).on('hashchange', updateReturnToLinks);
})(jQuery);
