/**
 * Created by livi on 16/4/20.
 */
$(function(){

    //若导航链接为自定义,锁定自定义项
    var linkselectData = $('#linkselect').data('val');
    if( linkselectData != ''){
        if(linkselectData!='/' && linkselectData!='/doc.html' && linkselectData!='/download.html' && linkselectData!='/activity.html' && linkselectData!='/topic.html' && linkselectData!='/topic/job.html' && linkselectData!='/donate.html'){
            $('#linkselect').val('custom');
            $('.customlink').show();
        }
    }

    //导航链接选择与自定义切换事件
    $('#linkselect').change(function(){
        var val = $(this).find('option:selected').val();
        val=='custom' ? $('.customlink').show() : $('.customlink').hide();$('.url').val('');
    })

    $("#savemenu").click(function(){
        var linkselect = $("#linkselect").val();
        if($('.url').val() != ''){
            linkselect = $('.url').val();
        }
        var newData={
            id:$("#tid").val(),
            menuname:$(".menuname").val(),
            appear: $("#menuselect").val(),
            target: $("#targetselect").val(),
            orders: $(".orders").val(),
            url:linkselect,
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/menu/save',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                    alert("保存成功！");
                    window.location.href="/admin/menu"
                }else{
                    alert(json.errmsg)
                }
            }
        })
    })

    $('.delete').bind('click', function () {
        var delId = $(this).attr("del-id");
        var delids=[];
        delids.push(delId);
        var r = confirm("确定删除？");
        if (r) {
            $.ajax({
                url: '/admin/menu/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/menu";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
        }
    })
})

    //批量删除
    var delsome=function(){
        var delids=[];
        $.each($('input[type="checkbox"]','tbody'),function(i,item){
            if($(item).is(':checked')){
                delids.push($(this).val());
            }
        })
        var r = confirm("确定删除？");
        if (r) {
            $.ajax({
                url: '/admin/menu/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/menu";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
            return false
        }
    }

//显示/隐藏标签
$(".isappear").on('click', function() {
    var mid = $(this).attr('menu-id');
    var menuVal = $(this).attr('menu-val');
    var newData = {
        id: mid,
        appear: menuVal,
        __CSRF__: G_csrf
    }
    $.ajax({
        url: '/admin/menu/save',
        data: newData,
        type: 'POST',
        success: function(json) {
            if (json.errno === 0) {
                alert("操作成功！");
                window.location.href = '/admin/menu/index';
            } else {
                alert(json.errmsg)
            }
        }
    })
})
