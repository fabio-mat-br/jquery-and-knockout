;
(function ($) {
	var methods = {
		self : this,
		init : function (options) {
			$.extend(methods.defaults, (options ? options: {}));
			return this.each(function () {
				var self = $(this),
				    width = 0,
				    height = 0;
				methods.createBasis(self);
			});
		},
		createBasis : function (elem) {
			var opts = $.fn.slideShow.opts;
			return elem.wrap(methods.createWrapper).addClass('slideshow-main').find('li > img').each(function () {
				width = $(this).width();
				height = $(this).height();
				if (width > opts.maxWidth) {
					ratio = opts.maxWidth / width;
					$(this).css("width", opts.maxWidth);
					$(this).css("height", height * ratio);
				}
				if ($(this).height() > opts.maxHeight) {
					var ratio = opts.maxHeight / height;
					$(this).css("height", opts.maxHeight);
					$(this).css("width", width * ratio);
				}
			}).end().find('li').each(function () {
				var txt = $(this).find('img').prop('title');
				$(this).addClass('wraptocenter').append($('<span>').text(txt).hide()).hover(function () {
					$(this).find('span').slideDown();
				}, function () {
					$(this).find('span').slideUp();
				});
			}).end().find('li:first').addClass('current first').end().find('li:last').addClass('last').end().before($('<a href="#">').addClass('nav-prev').on('click', methods.navPrev)).after($('<a href="#">').addClass('nav-next').on('click', methods.navNext));
		},
		createWrapper : function () {
			var opts = methods.defaults;
			return $('<div>').addClass('slideshow-wrap').width(opts.panelWidth).height(opts.maxHeight);
		},
		navNext : function (e) {
			if (!$('.current').hasClass('last')) {
				var t = $(this).closest('.slideshow-wrap'),
				    dim = t.find('.slideshow-main').position().left - t.find('.current').outerWidth();
				t.find('.slideshow-main').animate({
					left : dim
				}, function () {
					t.find('.current').removeClass('current').next().addClass('current');
				});
			}
		},
		navPrev : function (e) {
			if (!$('.current').hasClass('first')) {
				var t = $(this).closest('.slideshow-wrap'),
				    dim = t.find('.slideshow-main').position().left + t.find('.current').prev().outerWidth();
				t.find('.slideshow-main').animate({
					left : dim
				}, function () {
					t.find('.current').removeClass('current').prev().addClass('current');
				});
			}
		},
		defaults : {
			maxWidth : 250,
			maxHeight : 250,
			panelWidth : 500
		}
	};
	$.fn.slideShow = function (options, method) {
		var opts = $.extend({}, methods.defaults, (options ? options : {}));
		    $.fn.slideShow.opts = opts;
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};
})(jQuery);
$(window).load(function () {
	$('#slideshow').slideShow(
	{
			maxWidth : 320,
			maxHeight : 240,
			panelWidth : 800
		}
	).css('background', 'grey');
});
