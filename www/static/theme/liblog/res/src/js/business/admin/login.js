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
