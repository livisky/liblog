/**
 * Created by livi on 16/5/9.
 */
$(".ds-post-reply").on('click',function(){
    //replybox
    var link='/page/'+$("#aid").val();
    window.location.href=link+'#replybox';
    $("#replymsg").attr("placeholder","");
    $("#replyat").html("");
    var atname=$(this).attr("ds-name");
    var belongid=$(this).attr("ds-id");
    var athtml="<span class='at'>@"+atname+"</span>";
    $("#replyat").append(athtml);
    $(".ds-post-button").attr("belong-id",belongid);
})

$(".ds-post-button").on('click',function(){

    var comment="";
    if($("#replyat").html()!==""){
        comment=$("#replyat").html()+'&nbsp;&nbsp;'+$("#replymsg").val();
    }else{
        comment=$("#replymsg").val();
    }
    var newdata={
        aid:$(this).attr("aid"),
        author:$("#nickname").val(),
        email:$("#email").val(),
        comment:comment,
        belongid:$(this).attr("belong-id"),
        createtime:new Date(),
        __CSRF__: G_csrf
    }
    $.ajax({
        url: '/home/index/postcomment',
        data: newdata,
        type: 'POST',
        success: function (json) {
            if (json.errno === 0) {
                window.location.href = "/page/"+newdata.aid;
            }
        }
    })
})
$(function(){
    $(".ds-comment-body").mouseover(function(){
        $(this).find(".com-post-report").show();
    })
    $(".ds-comment-body").mouseout(function(){
        $(this).find(".com-post-report").hide();
    })


    //顶 交互
    $(".ds-post-likes").on('click',function(){
        var dsid=$(this).attr('ds-id');
        var $that=$(this);
        $.ajax({
            url: '/home/index/postdig',
            data: {id:dsid,__CSRF__: G_csrf},
            type: 'POST',
            success: function (json) {
                $that.find('span').addClass('ds-icon-heart');
            }
        })
    })
    $(".com-post-report").on('click',function(){
        var dsid=$(this).attr('ds-id');
        var $that=$(this);
        $.ajax({
            url: '/home/index/postreport',
            data: {id:dsid,__CSRF__: G_csrf},
            type: 'POST',
            success: function (json) {
                if (json.errno === 0) {
                    alert("感谢您的反馈！");
                }
            }
        })
    })
    //举报

    //$('.ds-icon-like').on('click',function(){
    //    toggleClass('ds-icon-heart');
    //})

})