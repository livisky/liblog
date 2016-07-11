/**
 * Created by livi on 16/4/20.
 */
$(function(){
    $("#savetag").click(function(){
        var newData={
            id:$("#tid").val(),
            name:$(".name").val(),
            password:$(".password").val(),
            email:$(".email").val(),
            role:$("#roleSelect").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/user/save',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                    alert("保存成功！");
                    window.location.href="/admin/user"
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
                url: '/admin/user/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/user";
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
                url: '/admin/user/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/user";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
            return false
        }
    }
