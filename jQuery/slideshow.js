//http://docs.jquery.com/Plugins/Authoring - Namespacing
;
(function ($) {
  $.fn.slideShow = function (options) {
    var opts = $.fn.slideShow.opts = $.extend({}, $.fn.slideShow.defaults, options);
    return this.each(function () {
      var self = $(this),
          width = 0,
          height = 0;
      $.fn.slideShow.createBasis(self);
    });
    
  };
  $.fn.slideShow.defaults = {
    maxWidth : 250,
    maxHeight : 250,
    panelWidth: 500
  };
  $.fn.slideShow.createBasis = function(elem){
    var opts = $.fn.slideShow.opts;
    return elem.wrap($.fn.slideShow.createWrapper).addClass('slideshow-main').find('li > img').each(function () {
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
        $(this).addClass('wraptocenter').append($('<span>').text(txt).hide()).hover(function(){
          $(this).find('span').slideDown()
        }, function(){
          $(this).find('span').slideUp()
        });
      }).end().find('li:first').addClass('current first').end()
      .find('li:last').addClass('last').end()
      .before($('<a>').addClass('nav-prev').on('click', $.fn.slideShow.navPrev))
      .after($('<a>').addClass('nav-next').on('click', $.fn.slideShow.navNext));
  };
  
  $.fn.slideShow.createWrapper = function()
  {
    var opts = $.fn.slideShow.opts;
    return $('<div>')
            .addClass('slideshow-wrap')
            .width(opts.panelWidth)
            .height(opts.maxHeight);
  }
  $.fn.slideShow.navNext = function(e)
  {
    debugger;
    if(!$('.current').hasClass('last'))
    {
      var t = $(this).closest('.slideshow-wrap'),
          dim = t.find('.slideshow-main').position().left - t.find('.current').outerWidth();
      t.find('.slideshow-main').animate({left: dim}, function(){
        t.find('.current').removeClass('current').next().addClass('current');
      });
    }
  }
  $.fn.slideShow.navPrev = function(e)
  {
    if(!$('.current').hasClass('first'))
    {
    var t = $(this).closest('.slideshow-wrap'),
        dim = t.find('.slideshow-main').position().left + t.find('.current').prev().outerWidth();
    t.find('.slideshow-main').animate({left: dim}, function(){
      t.find('.current').removeClass('current').prev().addClass('current');
    });
  }
  }
  })(jQuery);
$(window).load(function () {
  $('#slideshow').slideShow({
    maxWidth : 150,
    maxHeight : 100,
    panelWidth: 600
  }).css('background', 'grey');
});
