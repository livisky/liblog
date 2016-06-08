$(function(){
    $("#loginBtn").on('click',function(){
        var mydata={
            username:$("#username").val(),
            password:$("#password").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
                url:'/home/login/dologin',
                data:mydata,
                type:'POST',
                success:function(json){
                    if(json.status===0){
                        alert(json.msg);
                        window.location.href="/admin/index";
                    }else {
                        alert(json.msg);
                    }
                }
        })
    })
})