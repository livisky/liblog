/**
 * Created by livi on 16/4/19.
 */
    //文章搜索
        $("#search_article").on('click',function(){
            var searchTxt=$("#searchText").val();
            window.location.href="/admin/content/index?page=1&pagesize=10&search="+searchTxt;
        })
        $("#markselect").on('change',function(){
            var filter=$(this).val();
            window.location.href="/admin/content/index?page=1&pagesize=10&type="+filter;
        })
        $('.delete').bind('click', function () {
            var delId = $(this).attr("del-id");
            var delids = [];
            delids.push(delId);
            var r = confirm("确定删除？");
            if (r) {
                $.ajax({
                    url: '/admin/content/delsome',
                    data: {delarr: delids, __CSRF__: G_csrf},
                    type: 'POST',
                    success: function (json) {
                        if (json.errno === 0) {
                            alert("删除成功！");
                            window.location.href = "/admin/content";
                        }else{
                            alert(json.errmsg)
                        }
                    }
                })
            } else {
            }
        })
        var delsome = function () {
            var delids = [];
            $.each($('input[type="checkbox"]', 'tbody'), function (i, item) {
                if ($(item).is(':checked')) {
                    delids.push($(this).val());
                }
            })
            var r = confirm("确定删除？");
            if (r) {
                $.ajax({
                    url: '/admin/content/delsome',
                    data: {delarr: delids, __CSRF__: G_csrf},
                    type: 'POST',
                    success: function (json) {
                        if (json.errno === 0) {
                            alert("删除成功！");
                            window.location.href = "/admin/content";
                        }else{
                            alert(json.errmsg)
                        }
                    }
                })
            } else {
                return false
            }
        }

        //发布文章
        $("#published").on('click',function(){
          var aid=$(this).attr('pub-id');
          var newData={
            id:aid,
            ispublished:1,
            __CSRF__:G_csrf
          }
            $.ajax({
                url:'/admin/content/doadd/',
                data:newData,
                type:'POST',
                success:function(json){
                  if(json.errno===0){
                      alert("发布成功！");
                      window.location.href='/admin/content/draftlist';
                  }else{
                      alert(json.errmsg)
                  }
                }
            })
        })
        //回车触发提交表单
        $(document).keyup(function(event){
          if(event.keyCode ==13){
            $("#search_article").trigger("click");
          }
        });
