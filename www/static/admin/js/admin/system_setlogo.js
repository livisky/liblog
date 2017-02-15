

//上传缩略图
$('.add-img-btn input[type="file"]').on('change', function () {
    var $this = $(this);
    var addimgBtn=$this.parent();

    if($this.val()){
        $this.upload({
            url: '/admin/system/upload',
            data:{__CSRF__:G_csrf},
            success: function (result) {
                if (result) {
                    $("#picUrl").val(result.path);
                    $('.show-img-upload .add-img-btn').css("background-image",'url('+result.path+')')
                    alert('上传成功');
                    window.location.href="/admin/system/setlogo"
                } else {
                    console.log('上传失败');
                }
            },
            error: function (code, xhr, status, error) {
                console.log(error ? ('上传失败: ' + error) : "上传失败");
            }
        });
    }
});
    
$(function(){

    $("#savetag").click(function(){

        if($("#picUrl").val() == ''){
            alert('请选择图片!')
        }
        
        var newData={
            name:$("#picUrl").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/system/logoedit',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                    alert("保存成功！");
                    window.location.href="/admin/system/setlogo"
                }
            }
        })
    })

})



