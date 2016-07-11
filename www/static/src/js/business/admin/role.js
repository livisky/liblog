
$(function(){
    $("#saveitem").click(function(){
        var newData={
            id:$("#tid").val(),
            role:$(".role").val(),
            rolename:$(".itemname").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/role/save',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                    alert("保存成功！");
                    window.location.href="/admin/role"
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
                url: '/admin/role/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/role";
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
                url: '/admin/role/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/role";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
            return false
        }
    }

    $("#savepermission").on('click',function(){
          var prr=[],pids=[];
          $.each($('input[type="checkbox"]',$('.main')),function(i,item){
              if($(item).is(':checked')){
                  prr.push($(this).val());
                  pids.push($(this).attr('pid'))
              }
          })
          var newData={
              id:$("#rid").val(),
              pid:pids.join(","),
              permission:prr.join(","),
              __CSRF__:G_csrf
          }
          $.ajax({
              url:'/admin/role/rolesave',
              data:newData,
              type:'POST',
              success:function(json){
                  if(json.errno===0){
                      alert("保存成功！");
                      window.location.href="/admin/role"
                  }else{
                      alert(json.errmsg)
                  }
              }
          })
    })
