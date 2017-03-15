$(function() {
    $("#savetag").click(function() {
        var newData = {
            sitename: $(".sitename").val(),
            url: $(".url").val(),
            keywords: $(".keywords").val(),
            description: $(".description").val(),
            author: $(".author").val(),
            copyright: $(".copyright").val(),
            theme: $(".theme").val(),
            tongji: $(".tongji").val(),
            __CSRF__: G_csrf
        }
        $.ajax({
            url: '/admin/system/edit',
            data: newData,
            type: 'POST',
            success: function(json) {
                if (json.errno === 0) {
                    alert("保存成功！");
                    window.location.href = "/admin/system"
                }
            }
        })
    })

})