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
                        }
                    }
                })
            } else {
                return false
            }
        }
