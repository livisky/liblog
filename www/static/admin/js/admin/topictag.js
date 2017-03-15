/**
 * Created by Li Cong on 17/1/15.
 */
$(function () {
    $("#savetag").click(function () {
        var newData = {
            id: $("#tid").val(),
            name: $(".name").val(),
            comment: $(".comment").val(),
            __CSRF__: G_csrf
        }
        $.ajax({
            url: '/admin/topictag/save',
            data: newData,
            type: 'POST',
            success: function (json) {
                if (json.errno === 0) {
                    alert("保存成功！");
                    window.location.href = "/admin/topictag"
                } else {
                    alert(json.errmsg)
                }
            }
        })
    })

    $('.delete').bind('click', function () {
        var delId = $(this).attr("del-id");
        var delids = [];
        delids.push(delId);
        var r = confirm("确定删除？");
        if (r) {
            $.ajax({
                url: '/admin/topictag/delsome',
                data: {delarr: delids, __CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("删除成功！");
                        window.location.href = "/admin/topictag";
                    } else {
                        alert(json.errmsg)
                    }
                }
            })
        } else {
        }
    })
})

//批量删除
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
            url: '/admin/topictag/delsome',
            data: {delarr: delids, __CSRF__: G_csrf},
            type: 'POST',
            success: function (json) {
                if (json.errno === 0) {
                    alert("删除成功！");
                    window.location.href = "/admin/topictag";
                } else {
                    alert(json.errmsg)
                }
            }
        })
    } else {
        return false
    }
}
