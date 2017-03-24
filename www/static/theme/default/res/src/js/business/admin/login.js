//极验验证码
$(function() {
        var handlerEmbed = function(captchaObj) {

            $("#loginBtn").click(function(e) {
                var validate = captchaObj.getValidate();
                $("#captcha").find(".alert-danger").remove();
                if (!validate) {
                    $("#notice").addClass("show").removeClass("hide");
                    setTimeout(function() {
                        $("#notice").addClass("hide").removeClass("show");
                    }, 2000);
                    $("#captcha").append('<small class="help-block alert alert-danger checkright">请先拖动验证码到相应位置！</small>')
                    setTimeout(function() {
                        $("#captcha").find(".alert-danger").remove();
                    }, 2000);
                    e.preventDefault();
                } else {
                    //验证通过
                    var mydata = {
                        username: $("#username").val(),
                        password: $("#password").val(),
                        geetest_challenge: $("#challenge").val(),
                        geetest_seccode: $("#seccode").val(),
                        geetest_validate: $("#validate").val(),
                        __CSRF__: G_csrf
                    }
                    $.ajax({
                        url: '/home/admin/dologin',
                        data: mydata,
                        type: 'POST',
                        success: function(json) {
                            if (json.status === 1) {
                                alert(json.msg);
                                window.location.href = "/admin/index";
                            } else {
                                alert(json.msg);
                            }
                        }
                    })
                }
            });
            // 将验证码加到id为captcha的元素里
            captchaObj.appendTo("#captcha");
            captchaObj.onReady(function() {
                $("#wait")[0].className = "hide";
            });
            captchaObj.onSuccess(function() {
                var validate = captchaObj.getValidate();
                $("#challenge").val(validate.geetest_challenge);
                $("#seccode").val(validate.geetest_seccode);
                $("#validate").val(validate.geetest_validate);
            })
        };
        $.ajax({
            // 获取id，challenge，success（是否启用failback）
            url: "/home/register/geetest?t=" + (new Date()).getTime(), // 加随机数防止缓存
            data: { __CSRF__: G_csrf },
            type: "get",
            dataType: "json",
            success: function(data) {
                // 使用initGeetest接口
                // 参数1：配置参数
                // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: "float", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                }, handlerEmbed);
            }
        });
    })
    //回车触发提交表单
$(document).keyup(function(event) {
    if (event.keyCode == 13) {
        $("#loginBtn").trigger("click");
    }
});