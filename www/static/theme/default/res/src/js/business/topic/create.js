/**
 * Created by livi on 16/4/19.
 */

    var editor = new wangEditor('editor');
      editor.config.menus = [
        'bold',
        'underline',
        'italic',
        'fontsize',
        'strikethrough',
        'unorderlist',
        'orderlist',
        'img',
        'link',
        'forecolor',
        'bgcolor',
        'location',
        'table',
        'emotion',
        'insertcode',
        'eraser',
        'fullscreen'
      ];
    editor.config.uploadParams = {
        __CSRF__:G_csrf
    };
    editor.config.emotions = {
        'default': {
            title: '默认',
            data: '/static/theme/default/res/emotions.data'
        }
    };
    editor.config.uploadImgFileName = 'img';
    editor.config.uploadImgUrl = '/topic/create/uploadeditor';
    console.log(G_csrf);
    // 表情
    editor.create();

    $("#savetopic").click(function(){
        var html = editor.$txt.html();
        var content = $.trim(html);
        var text = editor.$txt.text();

        if($.trim(text)===""){
          $(".reply-error").remove();
          $("#savetopic").after('<span class="reply-error">回复内容不能为空！</span>');
          return false;
        }else{
            var newData={
                title:$("#topicTitle").val(),
                text:text,
                content:content,
                item:$("#tab-value").val(),
                author:$("#uname").val(),
                createtime:new Date(),
                updateauthor:$("#uname").val(),
                updatetime:new Date(),
                updatepic:$("#upic").val(),
                __CSRF__:G_csrf
            }
            $.ajax({
                url:'/topic/create/doadd',
                data:newData,
                type:'POST',
                success:function(json){
                    if(json.errno===0){
                        window.location.href="/topic.html"
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
      }
    })

    $("#updatetopic").click(function(){
        var html = editor.$txt.html();
        var content = $.trim(html);
        var newData={
            id:$("#tid").val(),
            title:$("#topicTitle").val(),
            content:content,
            item:$("#tab-value").val(),
            author:$("#uname").val(),
            createtime:new Date(),
            updateauthor:$("#uname").val(),
            updatetime:new Date(),
            updatepic:$("#upic").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/topic/create/doadd',
            data:newData,
            type:'POST',
            success:function(json){
              debugger
                if(json.errno===0){
                    window.location.href="/topic.html"
                }else{
                    alert(json.errmsg)
                }
            }
        })
    })

