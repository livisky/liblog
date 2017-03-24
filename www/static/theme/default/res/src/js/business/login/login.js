    //极验验证码
    $(function() {
        var handlerEmbed = function(captchaObj) {

            $("#dologin").click(function(e) {
                var validate = captchaObj.getValidate();
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

    //提交登录表单
    $("#dologin").click(function() {
        // 初始化
        reset();
        var form = $("#loginForm").validate({
            error: function(obj, error) { //自定义错误提示
                showError(obj, error);
                obj.one('keyup', function() {
                    $(this).parents('.form-group').removeClass('has-error has-feedback').find('.errorinfo,.glyphicon-remove').addClass('hidden');
                });
            },
            submitBtn: {
                flag: true,
            }
        });
        if (form) {
            //验证通过
            var newData = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                    geetest_challenge: $("#challenge").val(),
                    geetest_seccode: $("#seccode").val(),
                    geetest_validate: $("#validate").val(),
                    __CSRF__: $("#csrf").val()
                }
                //提交请求
            if ($("#challenge").val() !== "" && $("#seccode").val() !== "" && $("#validate").val() !== "") {
                $.ajax({
                    url: '/login/dologin',
                    data: newData,
                    type: 'POST',
                    success: function(json) {
                        if (json.errno === 0) {
                            window.location.href = "/personal/@" + json.uname
                        } else {
                            alert(json.errmsg);
                        }
                    }
                })
            }
            //提交请求
        }
        return false
    })

    // 校验邮箱
    $("#email").on('blur', function() {
            var _this = $(this);
            reset();
            _this.next(".isright").remove();
            var reg = /^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/,
                val = _this.val();
            if (val && !reg.test(val)) {
                showError(_this, '邮箱格式不正确!');
                return false
            }
        })
        // 重置
    function reset() {
        $(".register-item").removeClass("has-error");
        $('.alert-danger').remove();
    }

    function showError(obj, errmsg) {
        var errorEl = '<small class="help-block alert alert-danger checkright">' + errmsg + '</small>';
        obj.parents('.register-item').addClass('has-error').after(errorEl);
    }

    //回车触发提交表单
    $(document).keyup(function(event) {
        if (event.keyCode == 13) {
            $("#dologin").trigger("click");
        }
    });