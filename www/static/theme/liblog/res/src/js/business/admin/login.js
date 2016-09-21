$(function(){
    $("#loginBtn").on('click',function(){
        var mydata={
            username:$("#username").val(),
            password:$("#password").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
                url:'/home/admin/dologin',
                data:mydata,
                type:'POST',
                success:function(json){
                    if(json.status===1){
                        alert(json.msg);
                        window.location.href="/admin/index";
                    }else {
                        alert(json.msg);
                    }
                }
        })
    })
})

//回车触发提交表单
$(document).keyup(function(event){
  if(event.keyCode ==13){
    $("#loginBtn").trigger("click");
  }
});
