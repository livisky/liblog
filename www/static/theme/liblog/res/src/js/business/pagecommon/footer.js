/**
 * Created by chenlihua2 on 2016/6/8.
 */
$(window).scroll(function() {
    if ($(this).scrollTop() != 0) {
        $('#back-top').fadeIn();
    } else {
        $('#back-top').fadeOut();
    }
});
// 获取github star数
$.ajax({
    url: 'https://api.github.com/repos/livisky/liblog',
    type: 'GET',
    success: function(json) {
        if (json) {
            $("#gitcount").html(json.stargazers_count);
        }
    }
})
$("#back-top").on("click", function() { $("html,body").animate({ scrollTop: "0" }) })
    //搜素
$(".search-show").on('click', function() {
    $(".site-search").toggleClass('active')
    $(this).find(".fa-search").toggleClass('fa-remove');
})
$(".collect_btn").bind('click', function() {
    var _this = $(this);
    var link = window.location.pathname;
    var newData = {
        url: link,
        title: $("#article-title").html(),
        author: $("#loginname").val(),
        flag: _this.attr("flag"),
        cid: _this.attr("cid"),
        createtime: new Date(),
        type: _this.attr("itype"),
        aid: _this.attr("aid"),
        __CSRF__: G_csrf
    }
    $.ajax({
        url: '/personal/index/savecollect',
        data: newData,
        type: 'POST',
        success: function(json) {
            if (json.errno === 0) {
                if (json.data.status === 0) {
                    _this.attr("cid", "");
                    _this.removeClass("cancel");
                    _this.val("收藏");
                } else if (json.data.status === 1) {
                    _this.attr("cid", json.data.cid);
                    _this.addClass("cancel");
                    _this.val("取消收藏");
                }

            } else {
                alert(json.errmsg)
            }
        }
    })
})

// 个人头像下来效果
$('#nav-tabs').delegate('li', 'click', function() {
    var _this = $(this);
    var pid = _this.attr('pid');
    $('#nav-tabs').find('li').removeClass('active');
    $('.tab-pane').removeClass('active');
    $('.tab-pane').hide();
    _this.addClass('active');
    $('#' + pid).show();
})
$("#userInfo").on('mouseover', function() {
    $("#userMenu").show();
})
$("#userInfo").on('mouseout', function() {
        $("#userMenu").hide();
    })
    // 右侧tab切换
window.onload = function() {
    var otb = document.getElementById("tb");
    if (otb) {
        var oLi = document.getElementById("tb").getElementsByTagName("li");
        var oUl = document.getElementById("tb-main").getElementsByTagName("div");
        for (var i = 0; i < oLi.length; i++) {
            oLi[i].index = i;
            oLi[i].onmouseover = function() {
                for (var n = 0; n < oLi.length; n++)
                    oLi[n].className = "";
                this.className = "cur";
                for (var n = 0; n < oUl.length; n++)
                    oUl[n].style.display = "none";
                oUl[this.index].style.display = "block";
            }
        }
    }
}