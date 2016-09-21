;(function($){
	$.fn.validate=function(options){
		//是否批量验证
		var isone=options.isone?true:false;
		//提交按钮状态
		var submitBtn={
			flag:false,
			id:$(this).find("input[type='submit']"),
			txt:'提交中...'
		}
		//验证规则
		var validate={
				required:function(e){
					if(e.val()==''){
						_error(e,'required');
						return false
					}
				},
				user:function(e){
							var status;
							$.ajax({
                  url:'/home/register/isexist',
                  data:{name:e.val(),__CSRF__:$("#csrf").val()},
                  type:'POST',
                  success:function(json){
                      status=json.status;
											if(status===0){
												_error(e,'user');
												return false
											}
                  }
              })

				},
				isok:function(e){
					if (!(/^[a-zA-Z0-9_]+$/.test(e.val()))) {
						_error(e,'isok');
						return false
					}
				},
				password:function(e){
					if (/\s/.test(e.val())) {
						_error(e,'password');
						return false
					}
				},
				minpwd:function(e){
					if (e.val().length<6) {
						_error(e,'minpwd');
						return false
					}
				},
				repassword:function(e){
					if ($("#password").val()!==e.val()) {
						_error(e,'repassword');
						return false
					}
				},
				email:function(e){
					var reg=/^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'email');
						return false
					}
				},
				checkemail:function(e){
							var status;
							$.ajax({
									url:'/register/checkemail',
		              data:{email:e.val(),__CSRF__:$("#csrf").val()},
                  type:'POST',
                  success:function(json){
                      status=json.status;
											if(status===0){
												_error(e,'checkemail');
												return false
											}
                  }
              })
				},
				phone:function(e){
					var reg=/^1[3|5|8|7]\d{9}$/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'phone');
						return false
					}
				},
				code:function(e){
					var status;
					$.ajax({
							url:'/register/codeisright',
							data:{code:e.val(),__CSRF__:$("#csrf").val()},
							type:'POST',
							success:function(json){
									status=json.status;
							}
					})
					if(status===0){
						_error(e,'code');
						return false
					}
				},
				isqq:function(e){
					var reg=/^\d{5,10}$/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'isqq');
						return false
					}
				},
				url:function(e){
					var reg=/^http:\/\/.+\./,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'url');
						return false
					}
				},
				idcard:function(e){
					var reg=/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,val=e.val();
					if(val&&!reg.test(val)){
						_error(e,'idcard');
						return false
					}
				}
		}
		//提示信息
		var messages = {
			required: "必填项不能为空!",
			isok:'用户名由数字、字母或下划线组成！',
			user:"用户已存在！",
			checkemail:"邮箱已存在！",
			password:"不能包含空格！",
			minpwd:"密码长度不能低于6位！",
			repassword:"两次密码输入不一致！",
			email: "邮箱格式不正确！",
			phone:'格式不正确！',
			url: "格式不正确！",
			code: "验证码错误，请保持大小写一致！",
			isqq:'格式不正确！',
			idcard:'格式不正确！'
		}
		//合并对象
		if(options){
			if(options.messages){
				messages=$.extend(messages,options.messages)
			}
			if(options.validate){
				validate=$.extend(validate,options.validate)
			}
			if(options.submitBtn){
				submitBtn=$.extend(submitBtn,options.submitBtn)
			}
		}
		//错误提示
		_error=function(obj,error){
			if(options&&options.error){
				options.error(obj,messages[error]);
				return
			}
			alert(messages[error])
		}
		//校验
		function check(){
			var rule=$(this).attr('validate').split('|'),len=rule.length;
			for(var i=0;i<len;i++){
				if(validate.hasOwnProperty(rule[i])){
					if(validate[rule[i]]($(this))==false){
						return false;
						break;
					}
				}
			}
		}
		function yanzheng(){
			var success=true;
			$(this).find('[validate]').each(function(i, e) {
			   if(check.call(e)==false){
					success=false
					if(isone){
						return false //单条验证 默认为批量验证
					}
			   }
            });
			if(success){
				if(submitBtn.flag){
					submitBtn.id.val(submitBtn.txt)
				}
			}
			return success
		}
		return yanzheng.call(this)
	}
})(jQuery);
