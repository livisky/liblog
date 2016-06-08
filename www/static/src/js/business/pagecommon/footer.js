/**
 * Created by chenlihua2 on 2016/6/8.
 */
$(window).scroll(function() {
    if($(this).scrollTop() != 0) {
        $('#back-top').fadeIn();
    } else {
        $('#back-top').fadeOut();
    }
});
$("#back-top").on("click",function(){$("html,body").animate({scrollTop:"0"})})