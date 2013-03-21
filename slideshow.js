;
(function ($) {
  $.fn.slideShow = function (options) {
    var opts = $.extend({}, $.fn.slideShow.defaults, options);
    return this.each(function () {
      var self = $(this),
          width = 0,
          height = 0;
          
      self.addClass('slideshow-main').find('li > img').each(function () {
        width = $(this).width();
        height = $(this).height();
        if (width > opts.maxWidth) {
          ratio = opts.maxWidth / width;
          $(this).css("width", opts.maxWidth);
          $(this).css("height", height * ratio);
          height = height * ratio;
          width = width * ratio;
        }
        if ($(this).height() > opts.maxHeight) {
          ratio = opts.maxHeight / height;
          $(this).css("height", opts.maxHeight);
          $(this).css("width", width * ratio);
          width = width * ratio;
        }
      }).end().find('li').each(function(){
        var txt = $(this).find('img').prop('title');
        console.log(txt);
        $(this).addClass('wraptocenter').append($('<span>').text(txt));
      });
    });
  };
  $.fn.slideShow.defaults = {
    maxWidth : 250,
    maxHeight : 250,
    a : 1
  };
})(jQuery);
$(window).load(function () {
  $('#slideshow').slideShow({
    maxWidth : 150,
    maxHeight : 100
  }).css('background', 'grey');
});
