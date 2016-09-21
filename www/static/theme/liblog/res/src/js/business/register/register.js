    //极验验证码
    $(function () {
        var handlerEmbed = function (captchaObj) {

            $("#register").click(function (e) {
                var validate = captchaObj.getValidate();
                if (!validate) {
                    $("#notice").addClass("show").removeClass("hide");
                    setTimeout(function () {
                        $("#notice").addClass("hide").removeClass("show");
                    }, 2000);
                    e.preventDefault();
                }
                if (!validate) {
                    $("#captcha").append('<small class="help-block alert alert-danger checkright">请先拖动验证码到相应位置！</small>')
                    setTimeout(function () {
                        $("#captcha").find(".alert-danger").remove();
                    }, 2000);
                    e.preventDefault();
                }
            });
            // 将验证码加到id为captcha的元素里
            captchaObj.appendTo("#captcha");
            captchaObj.onReady(function () {
                $("#wait")[0].className = "hide";
            });
            captchaObj.onSuccess(function () {
              var validate = captchaObj.getValidate();
              $("#challenge").val(validate.geetest_challenge);
              $("#seccode").val(validate.geetest_seccode);
              $("#validate").val(validate.geetest_validate);
            })
        };
        $.ajax({
            // 获取id，challenge，success（是否启用failback）
            url: "/home/register/geetest?t=" + (new Date()).getTime(), // 加随机数防止缓存
            data:{__CSRF__:G_csrf},
            type: "get",
            dataType: "json",
            success: function (data) {
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
    $("#register").click(function(){
            // 初始化
            reset();
            var form=$("#registerForm").validate({
              error:function(obj,error){//自定义错误提示
                showError(obj,error);
              },
              submitBtn:{//开启按钮提交状态
                flag:true,
              }
            });
            if(form){
              //验证通过
              var newData={
                    name:$("#username").val(),
                password:$("#password").val(),
                  email:$("#email").val(),
                  code:$("#code").val(),
                  geetest_challenge:$("#challenge").val(),
                  geetest_seccode:$("#seccode").val(),
                  geetest_validate:$("#validate").val(),
                __CSRF__:$("#csrf").val()
              }
              //提交请求
              if($("#challenge").val()!==""&&$("#seccode").val()!==""&&$("#validate").val()!==""){
                $.ajax({
                    url:'/register/doregister',
                    data:newData,
                    type:'POST',
                    success:function(json){
                      if(json.errno===0){
                          alert("注册成功！");
                          window.location.href="/personal/@"+$("#username").val();
                      }else{
                          alert(json.errmsg);
                      }
                    }
                })
              }
              //提交请求
            }
            return false
    })
    $("#username").on('blur',function(){
      var _this=$(this);
          _this.next(".isright").remove();
          if((_this.val()).length>0){
            resetself(_this);
            _this.parents(".register-item").find(".iswrong").remove();
            if (!(/^[a-zA-Z0-9_]+$/.test(_this.val()))) {
                showError(_this,'用户名由数字、字母或下划线组成!');
  						return false
  					}else{
              $.ajax({
                  url:'/register/isexist',
                  data:{name:_this.val(),__CSRF__:$("#csrf").val()},
                  type:'POST',
                  success:function(json){
                      if(json.status!==0){
                        _this.parents(".register-item").find(".iswrong").remove();
                        _this.after('<span class="isright" id="basic-addon1">√</span>');
                      }else {
                        // showError(_this,'用户已存在!');
                        _this.parents('.register-item').addClass('has-error')
                        _this.after('<span class="iswrong" id="basic-addon1">x</span>');
                      }
                  }
              })
            }
          }
    })
    $("#email").on('blur',function(){
      var _this=$(this);
          _this.next(".isright").remove();
          if((_this.val()).length>0){
            resetself(_this);
            _this.parents(".register-item").find(".iswrong").remove();
            if (!(/^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/.test(_this.val()))) {
              showError(_this,'邮箱格式不正确!');
  						return false
  					}else{
              $.ajax({
                  url:'/register/checkemail',
                  data:{email:_this.val(),__CSRF__:$("#csrf").val()},
                  type:'POST',
                  success:function(json){
                    if(json.status!==0){
                      _this.parents(".register-item").find(".iswrong").remove();
                      _this.after('<span class="isright" id="basic-addon1">√</span>');
                    }else {
                      _this.parents('.register-item').addClass('has-error')
                      _this.after('<span class="iswrong" id="basic-addon1">x</span>');
                    }
                  }
              })
            }
          }
    })

    function reset(){
      $(".register-item").removeClass("has-error");
      $('.alert-danger').remove();
    }
    function resetself(self){
      var item=self.parents(".register-item");
      item.removeClass("has-error");
      item.find('.alert-danger').remove();
    }
    function showError(obj,errmsg){
      var errorEl='<small class="help-block alert alert-danger checkright" style="margin-bottom: 0px; margin-top: 10px;">'+errmsg+'</small>';
          obj.parents('.register-item').addClass('has-error').append(errorEl);
    }

    //回车触发提交表单
    $(document).keyup(function(event){
      if(event.keyCode ==13){
        $("#register").trigger("click");
      }
    });
