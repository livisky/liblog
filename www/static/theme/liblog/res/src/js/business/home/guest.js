
    $("#savetag").click(function(){
        reset();
        var form=$("#guestForm").validate({
          error:function(obj,error){//自定义错误提示
            showError(obj,error);
            obj.one('keyup',function(){
              $(this).parents('.form-group').removeClass('has-error has-feedback').find('.errorinfo,.glyphicon-remove').addClass('hidden');
            });
          },
          submitBtn:{
            flag:true,
          }
        });
        if(form){
              var newData={
                  nickname:$("#nickname").val(),
                  contact:$("#contact").val(),
                  guest:$("#guest").val(),
                  __CSRF__:$("#csrf").val()
              }
              $.ajax({
                  url:'/index/guestsave',
                  data:newData,
                  type:'POST',
                  success:function(json){
                      if(json.errno===0){
                          alert("提交成功！");
                          window.location.href="/"
                      }
                  }
              })
        }
        return false
    })
    function reset(){
      $(".register-item").removeClass("has-error");
      $('.alert-danger').remove();
    }
    function showError(obj,errmsg){
      var errorEl='<small class="help-block alert alert-danger checkright" style="margin-bottom: 0px; margin-top: 10px;">'+errmsg+'</small>';
          obj.parents('.register-item').addClass('has-error').after(errorEl);
    }
