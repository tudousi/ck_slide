//http://www.suning.com/
(function($){
    $.fn.ckSlide = function(opts){
        opts = $.extend({}, $.fn.ckSlide.opts, opts);

        this.each(function(){
            var slidewrap = $(this).find('.ck-slide-wrapper');
            var slide = slidewrap.find('li');
            var count = slide.length;
            var that = this;
            var index = 0;
            var time = null;
            $(this).data('opts', opts);

            // next
            $(this).find('.ck-next').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }

                var old = index;
                if(index >= count - 1){
                    index = 0;
                }else{
                    index++;
                }
                change.call(that, index, old);
            });

            // prev
            $(this).find('.ck-prev').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }

                var old = index;
                if(index <= 0){
                    index = count - 1;
                }else{
                    index--;
                }
                change.call(that, index, old);
            });

            //控制按钮绑定click事件
            $(this).find('.ck-slidebox li').each(function(cindex){
                $(this).on('click.slidebox', function(){    //slidebox是命名空间
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });

            // 鼠标滑过，清空定时器，并提高prev和next按钮的透明度
            $(this).on('mouseover', function(){
                if(opts.autoPlay){
                    clearInterval(time);
                }
                $(this).find('.ctrl-slide').css({opacity:0.6});
            });

            // 鼠标离开，设置定时器，并降低prev和next按钮的透明度
            $(this).on('mouseleave', function(){
                if(opts.autoPlay){
                    startAtuoPlay();
                }
                $(this).find('.ctrl-slide').css({opacity:0.15});
            });

            // 执行轮播
            startAtuoPlay();


            // auto play
            function startAtuoPlay(){
                if(opts.autoPlay){
                    time  = setInterval(function(){
                        var old = index;
                        if(index >= count - 1){
                            index = 0;
                        }else{
                            index++;
                        }
                        change.call(that, index, old);                                   
                    }, 2000);
                }
            }

            // 修正.ck-slidebox,保持水平居中
            var box = $(this).find('.ck-slidebox');
            box.css({
                'margin-left':-(box.width() / 2)
            });


            // dir
            // 如果存在dir参数
            switch(opts.dir){
                case "x":
                    opts['width'] = $(this).width();
                    slidewrap.css({
                        'width':count * opts['width']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative'
                    });
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                    break;
                case "y":
                    opts['height'] = $(this).height();
                    slidewrap.css({
                        'height':count * opts['height']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative',
                        'height': opts['height']
                    });
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                break;
            }
        });
    };

/**
 * 换切图片
 * @param  {[num]} show [要显示的图片]
 * @param  {[num]} hide [要隐藏的图片]
 */
    function change(show, hide){
        var opts = $(this).data('opts');
        // if(opts.dir == 'x'){
        //     var x = show * opts['width'];
        //     $(this).find('.ck-slide-wrapper').stop().animate({'margin-left':-x}, function(){opts['isAnimate'] = false;});
        //     opts['isAnimate'] = true
        // }else{
        //     $(this).find('.ck-slide-wrapper li').eq(hide).stop().animate({opacity:0});
        //     $(this).find('.ck-slide-wrapper li').eq(show).show().css({opacity:0}).stop().animate({opacity:1});
        // }

        switch (opts.dir) {
            case 'x':
                var x = show * opts['width'];
                $(this).find('.ck-slide-wrapper').stop().animate({'margin-left':-x}, function(){opts['isAnimate'] = false;});
                opts['isAnimate'] = true;
                break;
            case 'y':
                var y = show * opts['height'];
                $(this).find('.ck-slide-wrapper').stop().animate({'margin-top':-y}, function(){opts['isAnimate'] = false;});
                opts['isAnimate'] = true;
                break;
            default:
                $(this).find('.ck-slide-wrapper li').eq(hide).stop().animate({opacity:0});
                $(this).find('.ck-slide-wrapper li').eq(show).show().css({opacity:0}).stop().animate({opacity:1});
                break;
        }

        $(this).find('.ck-slidebox li').removeClass('current');
        $(this).find('.ck-slidebox li').eq(show).addClass('current');
    }

    $.fn.ckSlide.opts = {
        autoPlay: false,
        dir: null,
        isAnimate: false
    };

})(jQuery);