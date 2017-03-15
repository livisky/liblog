/**
 * Created by livi on 16/4/20.
 */

$(function() {

    $("#savetag").click(function() {
            var newData = {
                id: $("#tid").val(),
                domain: $(".domain").val(),
                link: $(".link").val(),
                logo: $(".logo").val(),
                qq: $(".qq").val(),
                flag: $("#tagselect").val(),
                orders: $(".orders").val(),
                __CSRF__: G_csrf
            }
            $.ajax({
                url: '/admin/links/save',
                data: newData,
                type: 'POST',
                success: function(json) {
                    if (json.errno === 0) {
                        alert("保存成功！");
                        window.location.href = "/admin/links/list"
                    } else {
                        alert(json.errmsg)
                    }
                }
            })
        })
        // 删除/批量删除接口
    $('.delete').bind('click', function() {
            var delId = $(this).attr("del-id");
            var delids = [];
            delids.push(delId);
            var r = confirm("确定删除？");
            if (r) {
                $.ajax({
                    url: '/admin/links/delsome',
                    data: { delarr: delids, __CSRF__: G_csrf },
                    type: 'POST',
                    success: function(json) {
                        if (json.errno === 0) {
                            alert("删除成功！");
                            window.location.href = "/admin/links";
                        } else {
                            alert(json.errmsg)
                        }
                    }
                })
            } else {}
        })
        // 显示该友情链接
    $(".toshow").on('click', function() {
            var tid = $(this).attr("tid");
            $.ajax({
                url: '/admin/links/upstatus',
                data: { id: tid, flag: 1, __CSRF__: G_csrf },
                type: 'POST',
                success: function(json) {
                    if (json.errno === 0) {
                        alert("更新成功！");
                        window.location.href = "/admin/links";
                    } else {
                        alert(json.errmsg)
                    }
                }
            })
        })
        // 隐藏该友情链接
    $(".tohide").on('click', function() {
        var tid = $(this).attr("tid");
        $.ajax({
            url: '/admin/links/upstatus',
            data: { id: tid, flag: 0, __CSRF__: G_csrf },
            type: 'POST',
            success: function(json) {
                if (json.errno === 0) {
                    alert("更新成功！");
                    window.location.href = "/admin/links/list";
                } else {
                    alert(json.errmsg)
                }
            }
        })
    })
})

//批量删除
var delsome = function() {
    var delids = [];
    $.each($('input[type="checkbox"]', 'tbody'), function(i, item) {
        if ($(item).is(':checked')) {
            delids.push($(this).val());
        }
    })
    var r = confirm("确定删除？");
    if (r) {
        $.ajax({
            url: '/admin/links/delsome',
            data: { delarr: delids, __CSRF__: G_csrf },
            type: 'POST',
            success: function(json) {
                if (json.errno === 0) {
                    alert("删除成功！");
                    window.location.href = "/admin/links";
                } else {
                    alert(json.errmsg)
                }
            }
        })
    } else {
        return false
    }
}