(function (window, document, $) {
	$.SocialImageShare = function (elem, e, shareDataSelector, shareDataElement) {

		var constants = {
			rootUrl: "https://www.children.org",
			facebookAppId: "963939967009179",
			facebookUrl: "https://www.facebook.com/dialog/share?",
			twitterUrl: "https://twitter.com/intent/tweet?",
			pinterestUrl: "https://www.pinterest.com/pin/create/button/?"
		};

		var openTab = function (url) {
			elem.attr("href", url);
			elem.attr("target", "_blank");
		};

		var popup = function (type, url) {

			var w, h;
			switch (type) {
				case "twitter":
					w = 550;
					h = 500;
					break;
				case "facebook":
					w = 670;
					h = 400;
					break;
				default:
					w = 500;
					h = 500;
					break;
			}
			var x = (screen.width / 2) - (w / 2);
			var y = (screen.height / 2) - (h / 2);

			var popupConfig = "width=" + w + ",height=" + h + ",left=" + x + ",top=" + y + ",";
			popupConfig += "resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes";
			var newWindow = window.open(url, "popup", popupConfig);
			if (!newWindow) {
				console.log("Unable to open popup, most likely due to a popup blocker!");
				openTab(url);
			} else {
				e.preventDefault();
			}
		};

		var urlBuilders = {
			'facebook': function (shareData) {
				var requestData = {
					'app_id': constants.facebookAppId,
					'display': "popup",
					'quote': shareData.facebookDescription,
					'href': shareData.facebookUrl
				};

				var params = $.param(requestData);
				return constants.facebookUrl + params;
			},
			'twitter': function (shareData) {
				var requestData = {
					'text': shareData.twitterDescription,
					'url': shareData.twitterUrl
				};

				var params = $.param(requestData);
				return constants.twitterUrl + params;
			},
			'pinterest': function (shareData) {
				var requestData = {
					'description': shareData.pinterestDescription,
					'url': shareData.pinterestUrl,
					'media': shareData.pinterestImage
				};

				var params = $.param(requestData);
				return constants.pinterestUrl + params;
			},
			'email': function (shareData) {
				var body = [shareData.emailUrl, shareData.emailImage].join("\n\n");

				var requestData = {
					'body': body
				};

				return "mailto:?subject=" + shareData.emailSubject + "&" + $.param(requestData);
			}
		};

		var getDescription = function (desc) {
			desc = !!desc ? desc.trim() : "";
			if (desc.length > 0) {
				return desc;
			}

			return null;
		};


		var getUtmCode = function (type) {
			var codes = {
				'facebook': {
					'source': "facebook",
					'medium': "social_media",
					'campaign': "share_button"
				},
				'twitter': {
					'source': "twitter",
					'medium': "social_media",
					'campaign': "share_button"
				},
				'pinterest': {
					'source': "pinterest",
					'medium': "social_media",
					'campaign': "share_button"
				},
				'email': {
					'source': "email_share",
					'medium': "email",
					'campaign': "share_button"
				}
			};

			return codes[type];
		};

		var parseUrl = function (url) {
			var a = document.createElement("a");
			a.href = url;
			return a;
		};

		var buildFullUrl = function (url, type) {
			var utmCode = getUtmCode(type);
			if (!utmCode)
				return url;

			var uri = parseUrl(url);
			uri.search = !uri.search ? $.param(utmCode) : uri.search + "&" + $.param(utmCode);
			return uri.href;
		};

		var getShareData = function () {
			var parent = (shareDataSelector == null)
				? shareDataElement
				: elem.parents(shareDataSelector);
			var facebookDescription = getDescription(parent.data("facebook-description"));
			var pinterestDescription = getDescription(parent.data("pinterest-description"));
			var twitterDescription = getDescription(parent.data("twitter-description"));
			var emailDescription = getDescription(parent.data("email-subject"));
			var type = elem.data("type");
			var facebookUrl = buildFullUrl(parent.data("facebook-url"), type);
			var twitterUrl = buildFullUrl(parent.data("twitter-url"), type);
			var pinterestUrl = buildFullUrl(parent.data("pinterest-url"), type);
			var emailUrl = buildFullUrl(parent.data("email-url"), type);
			return {
				type: type,
				facebookUrl: facebookUrl,
				facebookDescription: facebookDescription,
				twitterDescription: twitterDescription,
				twitterUrl: twitterUrl,
				pinterestDescription: pinterestDescription,
				pinterestImage: parent.data("pinterest-image"),
				pinterestUrl: pinterestUrl,
				emailSubject: emailDescription,
				emailUrl: emailUrl,
				emailImage: parent.data("email-image")
			};
		};

		var getUrlForShareData = function (shareData) {
			var builder = urlBuilders[shareData.type];
			if (!builder)
				return null;

			return builder(shareData);
		};

		function showShare(type, url) {
			if (type === "email") {
				window.location.href = url;
				return;
			}

			popup(type, url);
		};

		function init() {
			var shareData = getShareData();
			var shareUrl = getUrlForShareData(shareData);
			showShare(shareData.type, shareUrl);
		};

		init();
	};

	$.SocialShare = function (elem, e, shareDataSelector, shareDataElement) {

		var constants = {
			rootUrl: "https://www.children.org",
			facebookAppId: "963939967009179",
			facebookUrl: "https://www.facebook.com/dialog/share?",
			twitterUrl: "https://twitter.com/intent/tweet?",
			pinterestUrl: "https://www.pinterest.com/pin/create/button/?"
		};

		var openTab = function (url) {
			elem.attr("href", url);
			elem.attr("target", "_blank");
		};

		var popup = function (type, url) {

			var w, h;
			switch (type) {
				case "twitter":
					w = 550;
					h = 500;
					break;
				case "facebook":
					w = 670;
					h = 400;
					break;
				default:
					w = 500;
					h = 500;
					break;
			}
			var x = (screen.width / 2) - (w / 2);
			var y = (screen.height / 2) - (h / 2);

			var popupConfig = "width=" + w + ",height=" + h + ",left=" + x + ",top=" + y + ",";
			popupConfig += "resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes";
			var newWindow = window.open(url, "popup", popupConfig);
			if (!newWindow) {
				console.log("Unable to open popup, most likely due to a popup blocker!");
				openTab(url);
			} else {
				e.preventDefault();
			}
		};

		var urlBuilders = {
			'facebook': function (shareData) {
				var requestData = {
					'app_id': constants.facebookAppId,
					'display': "popup",
					'href': shareData.url,
					'title': shareData.title,
					'description': shareData.description,
					'picture': shareData.media
				};

				var params = $.param(requestData);
				return constants.facebookUrl + params;
			},
			'twitter': function (shareData) {
				var requestData = {
					'text': shareData.title,
					'url': shareData.url
				};

				var params = $.param(requestData);
				return constants.twitterUrl + params;
			},
			'pinterest': function (shareData) {
				var requestData = {
					'description': shareData.description,
					'url': shareData.url,
					'media': shareData.media
				};

				var params = $.param(requestData);
				return constants.pinterestUrl + params;
			},
			'email': function (shareData) {
				var body = [shareData.media, shareData.url].join("\n\n");

				var requestData = {
					'body': body
				};

				return "mailto:?subject=" + shareData.title + "&" + $.param(requestData);
			}
		};

		var getDescription = function (parent) {
			var desc = parent.data("description");
			desc = !!desc ? desc.trim() : "";
			if (desc.length > 0) {
				return desc;
			}

			return null;
		};


		var getUtmCode = function (type) {
			var codes = {
				'facebook': {
					'source': "facebook",
					'medium': "social_media",
					'campaign': "share_button"
				},
				'twitter': {
					'source': "twitter",
					'medium': "social_media",
					'campaign': "share_button"
				},
				'pinterest': {
					'source': "pinterest",
					'medium': "social_media",
					'campaign': "share_button"
				},
				'email': {
					'source': "email_share",
					'medium': "email",
					'campaign': "share_button"
				}
			};

			return codes[type];
		};

		var parseUrl = function (url) {
			var a = document.createElement("a");
			a.href = url;
			return a;
		};

		var buildFullUrl = function (url, type) {
			var utmCode = getUtmCode(type);
			if (!utmCode)
				return url;

			var uri = parseUrl(url);
			uri.search = !uri.search ? $.param(utmCode) : uri.search + "&" + $.param(utmCode);
			return uri.href;
		};

		var getShareData = function () {
			var parent = (shareDataSelector == null)
				? shareDataElement
				: elem.parents(shareDataSelector);
			var description = getDescription(parent);
			var type = elem.data("type");
			var url = buildFullUrl(parent.data("url"), type);
			return {
				type: type,
				title: parent.data("title"),
				description: description,
				media: parent.data("media"),
				url: url
			};
		};

		var getUrlForShareData = function (shareData) {
			var builder = urlBuilders[shareData.type];
			if (!builder)
				return null;

			return builder(shareData);
		};

		function showShare(type, url) {
			if (type === "email") {
				window.location.href = url;
				return;
			}

			popup(type, url);
		};

		function init() {
			var shareData = getShareData();
			var shareUrl = getUrlForShareData(shareData);
			showShare(shareData.type, shareUrl);
		};

		init();
	};

	$.fn.socialShare = function (e, shareDataSelector, shareDataElement) {

		if (!$.data(this, "_socialShare")) {
			var socialShare = new $.SocialShare(this, e, shareDataSelector, shareDataElement);
			this.data("_socialShare", socialShare);
		}
		return this.data("_socialShare");
	};

	$.fn.socialImageShare = function (e, shareDataSelector, shareDataElement) {

		if (!$.data(this, "_socialShare")) {
			var socialImageShare = new $.SocialImageShare(this, e, shareDataSelector, shareDataElement);
			this.data("_socialShare", socialImageShare);
		}
		return this.data("_socialShare");
	};

	var buildSocialShareWidgetHtml = function (data) {

		var html = [];
		html.push('<ul class="share-image-buttons / share-post / default / card-actions / white">');
		html.push('    <li>');
		html.push('        <a href="#" class="btn / btn-block / share / social-share-trigger"></a>');
		html.push('        <div class="social-share btn-' + data.sitesToShareCount + ' shareable-image / social-share-hook / addthis_sharing_toolbox"');
		html.push('            data-facebook-url="' + data.facebookUrl + '"');
		html.push('            data-facebook-description="' + data.facebookDescription + '"');
		html.push('            data-twitter-description="' + data.twitterDescription + '"');
		html.push('            data-twitter-url="' + data.twitterUrl + '"');
		html.push('            data-pinterest-description="' + data.pinterestDescription + '"');
		html.push('            data-pinterest-url="' + data.pinterestUrl + '"');
		html.push('            data-pinterest-image="' + data.pinterestMediaUrl + '"');
		html.push('            data-email-subject="' + data.emailSubject + '"');
		html.push('            data-email-url="' + data.emailUrl + '"');
		html.push('            data-email-image="' + data.emailImage + '">');
		html.push('            <div class="at-share-tbx-element addthis_32x32_style addthis-smartlayers addthis-animated at4-show">');
		if (data.sitesToShare.indexOf("Facebook") >= 0) {
			html.push('                <a class="at-share-btn at-svc-facebook" data-type="facebook"><span class="at-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" title="Facebook" alt="Facebook" class="at-icon at-icon-facebook white"><g><path d="M21 6.144C20.656 6.096 19.472 6 18.097 6c-2.877 0-4.85 1.66-4.85 4.7v2.62H10v3.557h3.247V26h3.895v-9.123h3.234l.497-3.557h-3.73v-2.272c0-1.022.292-1.73 1.858-1.73h2V6.143z" fill-rule="evenodd"></path></g></svg></span></a>');
		}
		if (data.sitesToShare.indexOf("Twitter") >= 0) {
			html.push('                <a class="at-share-btn at-svc-twitter" data-type="twitter"><span class="at-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" title="Twitter" alt="Twitter" class="at-icon at-icon-twitter white"><g><path d="M26.67 9.38c-.78.35-1.63.58-2.51.69.9-.54 1.6-1.4 1.92-2.42-.85.5-1.78.87-2.78 1.06a4.38 4.38 0 0 0-7.57 3c0 .34.04.68.11 1-3.64-.18-6.86-1.93-9.02-4.57-.38.65-.59 1.4-.59 2.2 0 1.52.77 2.86 1.95 3.64-.72-.02-1.39-.22-1.98-.55v.06c0 2.12 1.51 3.89 3.51 4.29a4.37 4.37 0 0 1-1.97.07c.56 1.74 2.17 3 4.09 3.04a8.82 8.82 0 0 1-5.44 1.87c-.35 0-.7-.02-1.04-.06a12.43 12.43 0 0 0 6.71 1.97c8.05 0 12.45-6.67 12.45-12.45 0-.19-.01-.38-.01-.57.84-.62 1.58-1.39 2.17-2.27z"></path></g></svg></span></a>');
		}
		if (data.sitesToShare.indexOf("Pinterest") >= 0) {
			html.push('                <a class="at-share-btn at-svc-pinterest_share" data-type="pinterest"><span class="at-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" title="Pinterest" alt="Pinterest" class="at-icon at-icon-pinterest white"><g><path d="M15.06 24.81c2.22 1.69 6.29.67 8.04-.84 2.53-2.17 3.7-6.57 3.33-10.06-.42-3.9-4.04-7.34-8.32-7.82-6.58-.74-12.57 3.32-12.61 9.77-.02 3.04.95 4.95 3.6 6.01 1.81-1.81-.34-2.99-.56-5.03-.56-5.42 5.84-10.64 11.51-7.26 3.96 2.35 3.28 12.44-1.52 13.41-.96.19-2.16-.11-2.63-.56-2.28-2.16 1.89-5.95.55-9.08-1.16-2.72-4.49-.54-4.85 1.81-.19 1.28.41 2.51.42 3.63.01 2.66-1.65 6.29-2.08 8.94-.16 1.03-.31 3.15-.07 4.23l-.04.04h1.74c1.22-2.08 2.05-5.21 2.67-7.89.38-.29.52.46.82.7z"></path></g></svg></span></a>');
		}
		if (data.sitesToShare.indexOf("Email") >= 0) {
			html.push('                <a class="at-share-btn at-svc-email" data-type="email"><span class="at-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" title="Email" alt="Email" class="at-icon at-icon-email white"><g><g fill-rule="evenodd"></g><path d="M26 22.006c0 1.1-.898 1.994-1.99 1.994H7.99C6.89 24 6 23.105 6 22.006V14.03c0-.55.388-.77.872-.486l7.887 4.6c.71.415 1.77.415 2.48 0l7.888-4.6c.482-.28.872-.052.872.485v7.976z"></path><path d="M26 9.994C26 8.894 25.11 8 24.01 8H7.99C6.9 8 6 8.893 6 9.994v.303c0 .553.385 1.226.86 1.504l8.655 5.05c.243.14.727.14.97 0l8.654-5.05c.474-.277.86-.943.86-1.503v-.303z"></path></g></svg></span></a>');
		}
		html.push('            </div>');
		html.push('        </div>');
		html.push('    </li>');
		html.push('</ul>');

		return html.join('');
	};

	$(function () {
		$(document).on('click', '.social-share-trigger', function (e) {
			e.preventDefault();
			$(this).next('.social-share').toggleClass('show');
		});

		$(document).on("click", ".callout-close.social-share-trigger", function () {
			//alert("click bound to document listening for #test-element");
			$(this).closest('.social-share').toggleClass('show');
		});

		$(document).on('click', ".at-share-btn", function (e) {
			if ($(this).closest('.social-share-hook').hasClass('shareable-image')) {
				$(this).socialImageShare(e, ".social-share-hook");
			}
			else {
				$(this).socialShare(e, ".social-share-hook");
			}
		});

		$('img.img-shareable').each(function (i, e) {
			var img = $(this);
			var parent = img.parent();
			var target = parent.prop('tagName') == "A" ? parent : img;

			var src = img.attr('src');

			var data = {
				facebookUrl: img.data('facebook-url'),
				facebookDescription: img.data('facebook-description'),
				twitterDescription: img.data('twitter-description'),
				twitterUrl: img.data('twitter-url'),
				pinterestDescription: img.data('pinterest-description'),
				pinterestUrl: img.data('pinterest-url'),
				pinterestMediaUrl: img.data("pinterest-image"),
				sitesToShare: img.data('sitestoshare'),
				sitesToShareCount: img.data("sitestosharecount"),
				emailSubject: img.data('email-subject'),
				emailUrl: img.data("email-url"),
				emailImage: img.data("email-image")
			};

			var shareWidgetHtml = buildSocialShareWidgetHtml(data);
			var wrapper = $('<div class="image-share-wrapper"></div>');
			var fullWidth = img.hasClass('bg-image');
			if (fullWidth) {
				wrapper.css('width', '100%');
				wrapper.css('height', 'auto');
				wrapper.css('min-height', '100%');
			}
			target.not('.bg-image').wrap(wrapper);
			target.before(shareWidgetHtml);
		});
		
	});

}(window, document, jQuery));
