/*global jQuery: true */
/*jslint devel: false, browser: true, sloppy: false, nomen: true, maxerr: 50, indent: 2 */

(function ($, window) {

  'use strict';

  var methods = {
    init: function (options) {

      return this.each(function () {
        var $this = $(this),
          data = $this.data('lightbox');

        if (!data) {
          // Initialize
          var $lightboxContent = $this.find('.lightbox-content').clone(), // Find lightbox content
            $overlay = $('<div/>').addClass('lightbox-overlay'),          // Overlay
            $close = $('<div/>').addClass('lightbox-close');              // Close button

          // Get rid of lightbox content in dom
          $this.find('.lightbox-content').remove();

          $close.html('<a href="#">close</a>');

          $lightboxContent.prepend($close);

          // Minimum styles needed for layout
          $lightboxContent.css({
            'position': 'fixed',
            'top': '40%',
            'left': '50%',
            'z-index': '501'
          });

          $overlay.css({
            'position': 'fixed',
            'top': 0,
            'left': 0,
            'width': '100%',
            'height': '100%',
            'background': 'rgba(0, 0, 0, 0.8)',
            'z-index': '500'
          });

          $this.data('lightbox', {
            content: $lightboxContent,
            overlay: $overlay,
            close: $close
          });

          // Bind events
          $this.bind('click', function(e) {
            e.preventDefault();
            $this.lightbox('open');
          });

          $this.data('lightbox').overlay.bind('click', function (e) {
	          e.preventDefault();
            $this.lightbox('close');
          });

          $this.data('lightbox').close.bind('click', function (e) {
	          e.preventDefault();
            $this.lightbox('close');
          });
        }
      });
    },

    open: function () {
      var $this = $(this),
        dat = $this.data('lightbox');

      $('body').append(dat.overlay);
      $('body').append(dat.content);

      dat.content.css({
        'margin-left': ((dat.content.outerWidth() / 2) * -1) + 'px',
        'margin-top': ((dat.content.outerHeight() / 2) * -1) + 'px'
      });
    },

    close: function () {
      var $this = $(this);
      $this.data('lightbox').overlay.detach();
      $this.data('lightbox').content.detach();
    }
  };

  $.fn.lightbox = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.lightbox');
    }
  };

}(jQuery, window));