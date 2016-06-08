/**
 * Created by livi on 16/4/19.
 */

    //生成编辑器
    // var editor = new wangEditor('editor');
    //     editor.create();
    //上传markdown文件，返回html解析并赋值
    $('.add-img-btn2 input[type="file"]').on('change', function () {
        var $this = $(this);
        var addimgBtn=$this.parent();

        if($this.val()){
            $this.upload({
                url: '/admin/content/uploadfile',
                data:{__CSRF__:G_csrf},
                success: function (result) {
                    if (result) {
                        $("#editor").html(result.articlehtml);
                        var ainfo=result.ainfo||{};
                        $(".title").val(ainfo.title);
                        $(".author").val(ainfo.author);
                        $(".keywords").val(ainfo.keywords);
                        $(".abstract").val(encodeHTMLContent(ainfo.abstract));

                        var pic =ainfo.thumbnail;
                        var totop=ainfo.totop;
                        var torecom=ainfo.torecom;
                        var topicrecom=ainfo.topicrecom;

                        function tocheck(el,item){
                            if(item===1){
                                $(el).attr("checked",true);
                            }
                        }
                        function encodeHTMLContent(str) {
                            if(str){
                                return str.replace(/&quot;/g, '"').replace(/&#39;/g,"'s");
                            }
                        }
                        tocheck($("#totop"),totop);
                        tocheck($("#torecom"),torecom);
                        tocheck($("#topicrecom"),topicrecom);
                        if(result.errno>=0){
                            alert(result.errmsg)
                        }

                    } else {
                        alert(result.errmsg)
                    }
                },
                error: function (code, xhr, status, error) {
                    console.log(error ? ('上传失败: ' + error) : "上传失败");
                }
            });
        }
    });

    //上传缩略图
    $('.add-img-btn input[type="file"]').on('change', function () {
        var $this = $(this);
        var addimgBtn=$this.parent();

        if($this.val()){
            $this.upload({
                url: '/admin/content/upload',
                data:{__CSRF__:G_csrf},
                success: function (result) {
                    if (result) {
                        $("#picUrl").val(result.path);
                        $('.show-img-upload .add-img-btn').css("background-image",'url('+result.path+')')
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

    //预览/发布文章
    $(function(){
        //预览文章
        $("#previewArticle").on('click',function(){
            var pid=$(this).attr("pid");
            if(pid===""){
                dosubmit('/admin/content/doadd',0,function(json){
                    if(json.errno===0){
                        $("#previewArticle").attr("pid",json.data.id);
                        $("#addArticle").attr("pid",json.data.id);
                        window.open("/preview/"+json.data.id,"_blank");
                    }
                });
            }else{
                //更新文章状态
                dosubmit('/admin/content/doadd/',0,function(json){
                    if(json.errno===0){
                        window.open("/preview/"+pid,"_blank");
                    }
                })

            }
        })
        //发布文章
        $("#addArticle").on('click',function(){
            var pid=$(this).attr("pid");
            if(pid===""){
                //直接发布
                dosubmit('/admin/content/doadd',1,function(json){
                    if(json.errno===0){
                        alert("发布成功！");
                        $("#previewArticle").attr("pid",json.data.id);
                        $("#addArticle").attr("pid",json.data.id);
                        window.location.href='/admin/content';
                    }
                })
            }else{
                //更新文章状态
                dosubmit('/admin/content/doadd/',1,function(json){
                    if(json.errno===0){
                        alert("发布成功！");
                        window.location.href='/admin/content';
                    }
                })
            }
        })
        //公用方法
        var dosubmit=function(httpUrl,ispublished,callback){
            var totopVal=$("#totop").is(':checked') ? 1 : 0;
            var torecomVal=$("#torecom").is(':checked') ? 1 : 0;
            var topicrecomVal=$("#topicrecom").is(':checked') ? 1 : 0;
            var topicrecomVal=$("#topicrecom").is(':checked') ? 1 : 0;
            var allowcommentVal=$("#allowcomment").is(':checked') ? 1 : 0;
            var html = editor.$txt.html();
            var content = $.trim(html);
            var newData={
                id:$("#previewArticle").attr("pid"),
                title:$(".title").val(),
                abstract:$("#abstract").val(),
                content:content,
                picurl:$("#picUrl").val(),
                author:$("#author").val(),
                createtime:new Date(),
                totop:totopVal,
                torecom:torecomVal,
                topicrecom:topicrecomVal,
                tag:$("#tagselect").val(),
                item:$("#itemselect").val(),
                keywords:$("#keywords").val(),
                from:$(".from").val(),
                allowcomment:allowcommentVal,
                ispublished:ispublished,
                __CSRF__:G_csrf

            }
            $.ajax({
                url:httpUrl,
                data:newData,
                type:'POST',
                success:callback
            })
        }
        
        
        
   
    var editor = new wangEditor('editor');
    editor.config.uploadParams = {
        __CSRF__:G_csrf
    };
    editor.config.emotions = {
        'default': {
            title: '默认',
            data: '/static/emotions.data'
        }
    };
    editor.config.uploadImgFileName = 'thumb_img';
    editor.config.uploadImgUrl = '/admin/content/uploadeditor';
    console.log(G_csrf);
    // 表情
    editor.create();     
        
})
