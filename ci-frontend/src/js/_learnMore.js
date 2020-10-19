/*
Handles links with data-open / data-close values
*/
(function ($) {
    function open(id, sender) {
   
        sender.closest('.swiper-slide').addClass('open');

        var factText = sender.closest('.swiper-slide').parents('.section-child-fact').find('.section-child-fact-text');
        $(factText).removeClass('hide');
        //console.log('sender is:', sender, 'id is:', id);
        //console.log('.section-child-fact-text is:', factText);
    
        $('#' + id).slideDown();
        //console.log('Slide down is:', $('#' + id));

    $('[data-open=' + id + ']').each(function () {
      var close = $(this).data('close');
      if (close) {
        close = close.replace(' +', ' <i class="icon-plus"></i>')
          .replace(' -', ' <i class="icon-minus"></i>');
        $(this).html(close);
      }
    });
  }

  function close(id) {
    return $('#' + id).slideUp(500).promise().then(function() {
      $('[data-open=' + id + ']').each(function () {
        $(this).html($(this).data('originalHtml'));
      });
    });
  }

  function openClick(e) {
    e.preventDefault();

    var t = $(this),
      detailsId = t.data('open'),
      detailsObject = $('#' + detailsId),
      isVisisble = detailsObject.is(':visible'),
      self = t.get(0);
      //console.log('openClick is:', this);


    var t = closeAll()
    .then(function () {
      if (!isVisisble) {
        open(detailsId, $(self));
      }
    });
  }

  function closeAll() {
    var closePromises = [];
    $('[data-open]').each(function () {
      closePromises.push(close($(this).data('open')));
    });
    
    return $.when.apply($, closePromises).then(function() {
      $('.section-child-fact-text').addClass('hide');
      $('.swiper-slide').removeClass('open');
    });
  }


  $(function () {
    // Certain text is contained (hidden) within swipeable blocks that should not
    // swipe along with content of the block.  So for simplicity, it's moved to
    // a container below the swipeable container.
      $('.child-detail-fact-details').each(function () {
          $(this).parents('.section-child-fact').find('.section-child-fact-text .fact-details').append($(this));
          //console.log('.child-detail-fact-details is:', this);
      });

    // Store the original "learn more" text
    $('[data-open]').each(function () {
      var t = $(this);
      var html = t.html()
        .replace(' +', ' <i class="icon-plus"></i>')
        .replace(' -', ' <i class="icon-minus"></i>');
      
      t.data('originalHtml', html);
      t.html(html);
    });

    // Bind click handler
    $(document).on('click', '[data-open]', openClick);

    $(document).on('swiperTransitionEnd', closeAll);
  });
})(jQuery);