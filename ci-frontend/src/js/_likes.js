/*
Handles loading and displaying likes, catching "like" button clicks, etc.
*/
var userLikes = (function () {

    var userLikes = {}

    userLikes.SESSION_STORE_KEY = 'likes';
	userLikes.likes = null;

    userLikes.getKeys = Object.keys || function (obj) {
		var keys=[], key;
		for (key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				keys.push(key);
			}
		}
		return key;
	}

	userLikes.serialize = function(likesObj) {
		return userLikes.getKeys(likesObj).join('|');
	}

	userLikes.deserialize = function(likesString) {
		if (!likesString)
			return null;

		var obj = {}, split = likesString.split('|');
		for (var x = split.length - 1; x >= 0; x--) {
			obj[split[x]] = 1;
		}
		return obj;
	}

	var getRoundedLikeCount = function (count) {
	    if(count < 1000)
	    {
	        return count;
	    }

	    var rounded = Math.round(count / 1000);
	    return rounded + "k";
	};

	function unique(array) {
	    return $.grep(array, function (el, index) {
	        return index === $.inArray(el, array);
	    });
	}

	userLikes.updateVisibleLikes = function () {

	    var selectors = $('[data-like-id]').map(function (i) {
	        return '[data-like-id="' + $(this).data('likeId') + '"]';
	    }).get();

	    selectors = unique(selectors);

	    console.log(selectors);
        
	    selectors.forEach(function (selector) {
	        var t = $(selector);
	        var id = t.data('likeId');

	        var originallyActive = t.hasClass('originallyActive');
	        var currentlyActive = t.hasClass('active');
	        var active = !!userLikes.likes[id];

	        t.toggleClass('active', active);

	        var countElem = $('[data-like-id-count-hook="' + id + '"]');
	        var count = parseInt(countElem.attr('data-like-id-count'), 10) || 0;

	        if (!originallyActive && active) {
	            count = count + 1;
	        } else if (originallyActive && !active) {
	            count = count - 1;
	        }

	        if (count > 0) {
	            var rounded = getRoundedLikeCount(count);
	            countElem.html(rounded);
	            countElem.show();
	        }
	        else {
	            countElem.hide();
	        }
	    });
	}

	userLikes.onData = function(data) {
		var newLikes = {};
		for(var x = data.length - 1; x >= 0; x--) {
			newLikes[data[x]] = 1;
		}
		userLikes.likes = newLikes;
		if (window.sessionStorage) {
			window.sessionStorage.setItem(userLikes.SESSION_STORE_KEY, userLikes.serialize(userLikes.likes));
		}
		userLikes.updateVisibleLikes();
	}

	$(function () {

		$(document).on('click', '[data-like-id]', function (e) {
			e.preventDefault();

			var id = $(this).data('likeId');

			$.ajax({
				url: '/ActionLog/ToggleLike',
				method: 'POST',
				dataType: 'JSON',
				data: { id: id }
			}).done(userLikes.onData);
        });

		if (window.sessionStorage) {
		    var serializedLikes = userLikes.deserialize(window.sessionStorage.getItem(userLikes.SESSION_STORE_KEY));
			if (serializedLikes) {
			    userLikes.likes = serializedLikes;
				userLikes.updateVisibleLikes();
				return;
			}
		}
	});

    return userLikes;
})();

