    $("#dosave").click(function(){
            // 初始化
            reset();
            var form=$("#completeForm").validate({
              error:function(obj,error){//自定义错误提示
                showError(obj,error);
                obj.one('keyup',function(){
                  $(this).parents('.form-group').removeClass('has-error').find('.errorinfo,.glyphicon-remove').addClass('hidden');
                });
              },
              submitBtn:{
                flag:true,
              }
            });
            if(form){
              //验证通过
              var newData={
                  openid:$("#openid").val(),
                  email:$("#email").val(),
                  name:$("#name").val(),
                  nickname:$("#nickname").val(),
                  pic:$("#pic").val(),
                  way:$("#way").val(),
                  createtime:new Date(),
                  __CSRF__:$("#csrf").val()
              }
              $.ajax({
                  url:'/home/register/adduser',
                  data:newData,
                  type:'POST',
                  success:function(json){
                    if(json.errno===0){
                        window.location.href="/login";
                    }else{
                        // alert(json.errmsg);
                    }
                  }
              })
            }
            return false
    })

    $("#name").on('blur',function(){
      var _this=$(this);
          _this.next(".isright").remove();
          if((_this.val()).length>0){
            resetself(_this);
            _this.parents(".register-item").find(".iswrong").remove();
            _this.next(".isright").remove();
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
                        _this.parents('.register-item').addClass('has-error')
                        _this.after('<span class="iswrong" id="basic-addon1">x</span>');
                      }
                  }
              })
            }
          }
    })

    // 校验邮箱
    $("#email").on('blur',function(){
      var _this=$(this);
          _this.next(".isright").remove();
          var reg=/^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/,val=_this.val();
          if(val!==''){
            resetself(_this);
            _this.parents(".register-item").find(".iswrong").remove();
            if(val&&!reg.test(val)){
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
    // 重置
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
      var errorEl='<small class="help-block alert alert-danger checkright">'+errmsg+'</small>';
          obj.parents('.register-item').addClass('has-error').append(errorEl);
    }

    //回车触发提交表单
    $(document).keyup(function(event){
      if(event.keyCode ==13){
        $("#dosave").trigger("click");
      }
    });
