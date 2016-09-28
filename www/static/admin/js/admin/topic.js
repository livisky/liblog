/**
 * Created by livi on 16/4/20.
 */
$(function(){
    $(".taction").click(function(){
        var newData={
            id:$(this).attr("tid"),
            show:$(this).attr("tval"),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/topic/update',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                  debugger
                    alert("保存成功！");
                    window.location.href="/admin/topic/index"
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
                url: '/admin/topic/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/topic/index";
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
                url: '/admin/topic/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/topic/index";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
            return false
        }
    }
