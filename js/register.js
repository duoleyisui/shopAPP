$('#btn').click(function(){
			var name=document.getElementById('uname').value;
		    var pwd=document.getElementById('pwd').value;
		    $('#nameErr').html('');
			$('#pwdErr').html('');
			if(name==''){
				$('#nameErr').html('用户名不能为空');
			}
			else if(pwd==''){
				$('#pwdErr').html('密码不能为空');
			}
			else{
			$.ajax({
				type:"get",
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				data:{status:'register',userID:name,password:pwd},
				success:function(data){
					console.log(data);
					if(data==0){
					$('#nameErr').html('用户名重名');
					}
					else if(data==2)
					{
					$('#nameErr').html('数据库出问题');		
					}
					else{
					alert('注册成功！');
					window.location.href='login.html';
					}
				},
				error:function(data){
					
				}
			});
		}
		});