$("#saveBase").click(function(){
        // 初始化
        reset();
        var form=$("#baseForm").validate({
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
          //验证通过
          var newData={
              email:$("#email").val(),
              name:$("#name").val(),
              nickname:$("#nickname").val(),
              sign:$("#sign").val(),
              __CSRF__:$("#csrf").val()
          }
          $.ajax({
              url:'/personal/setting/savebase',
              data:newData,
              type:'POST',
              success:function(json){
                if(json.errno===0){
                    alert("更新成功！");
                    window.location.href="/personal/setting";
                }else{
                    alert(json.errmsg);
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
      obj.parents('.register-item').addClass('has-error').append(errorEl);
}

//回车触发提交表单
$(document).keyup(function(event){
  if(event.keyCode ==13){
    $("#saveBase").trigger("click");
  }
});
