var el=$("#j_Alteravatar");
el.delegate('li','click',function(){
  var picUrl=$(this).find("img").attr("avatar-url");
  if(picUrl){
    var newData={
        pic:picUrl,
        __CSRF__:$("#csrf").val()
    }
    $.ajax({
        url:'/personal/setting/resetpic',
        data:newData,
        type:'POST',
        success:function(json){
          if(json.errno===0){
              alert("更新成功！");
              document.location.reload();
          }else{
              alert(json.errmsg);
          }
        }
    })
  }
})
