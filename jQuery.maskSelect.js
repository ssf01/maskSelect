(function ($) {
    $.fn.maskSelect = function () {
        return this.each(function () {
            var $this = $(this),
            width = $this.width() + 5,
            option = $this.find('option'),
            text = $this.find('option:selected').text(),
            disabled = '',
            optionWrite = [];

            if ($(this).hasClass('aspNetDisabled')) {
                disabled = "disabled"
            }

            $this.wrap('<span class="ui-mask mask-select"></span>');
            $this.after('<div class="text-holder ' + disabled + '"><span>' + text + '</span></div><ul class="options"></ul>')

            //$this.parent().css('min-width', width)

            option.each(function () {
                var pushArray = $(this).text();
                optionWrite.push('<li>' + pushArray + '</li>');
            })

            $this.siblings('.options').html(optionWrite);

            /* select box */
            $this.next('.text-holder').on('click', function () {
                if (!$(this).hasClass('disabled')) {
                    $(this).toggleClass('active').next('.options').toggle();
                }
            });

            $(document).mouseup(function (e)            {
                var container = $(".mask-select");

                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    $('.text-holder').removeClass('active');
                    $('.options').hide();
                }
            });

            $this.siblings('.options').find('li').on('click', function () {
                var $this = $(this),
                text = $this.text();

                $this.parent().siblings('.text-holder').find('span').text(text);
                $this.parent().siblings('select').find(" option").filter(function () {
                    //may want to use $.trim in here
                    return $(this).text() == text;
                }).prop('selected', true).trigger('change');

                $this.parent().hide();
                $this.parent().prev().removeClass('active');
            });

        });
    }
})(jQuery);

