$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#section-about');

    /* RIPPLE EFFECT */
    var ink, d, x, y;
    $('body').on('click', '.section-contact-list-item,.button,.carousel-control', function (e) {
        if ($(this).find('.ink').length === 0) {
            $(this).prepend('<span class="ink"></span>');
        }

        ink = $(this).find('.ink');
        ink.removeClass('animate');

        if (!ink.height() && !ink.width()) {
            d = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({height: d, width: d});
        }

        x = e.pageX - $(this).offset().left - ink.width()/2;
        y = e.pageY - $(this).offset().top - ink.height()/2;

        ink.css({top: y + 'px', left: x + 'px'}).addClass('animate');
    });

    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        if ($(this).attr('href') !== '#section-pc-carousel-sm' && $(this).attr('href').indexOf('#section-pf-carousel') === -1) {
            $(document).off('scroll');

            $('a').each(function () {
                $(this).removeClass('active');
            });

            $(this).addClass('active');

            var target = this.hash;
            $target = $(target);

            $('html, body').stop().animate({'scrollTop': $target.offset().top + 2}, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on('scroll', navStyles);
            });
        }
    });

    function navStyles() {
        scroll_start = $(this).scrollTop();
        var scrollPos = $(document).scrollTop();

        $('#nav-list a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));

            if ((refElement.position().top - 65) <= scrollPos && (refElement.position().top - 65) + refElement.outerHeight() > scrollPos) {
                $('#nav-list a').parent().removeClass('active');
                currLink.parent().addClass('active');
            }  else {
                currLink.parent().removeClass('active');
            }
        });
    }

    navStyles();

    if (startchange.length) {
        $(document).scroll(function () {
            navStyles();
        });
    }

    $('.section-pf-sm-item').click(function () {
        var index = $(this).index();
        $('.section-pf-item').removeClass('active');
        $('.section-pf-carousel').removeClass('active');

        if ($(this).closest('.carousel-item').index() === 1) {
            index += 4;
        }

        $('.section-pf-container').children().eq(index).addClass('active');
        $('#carousel-container').children().eq(index).addClass('active');
    });
});
