$('#btn2').click(function(){
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
				dataType:'json',
				data:{status:'login',userID:name,password:pwd},
				success:function(data){
					if(data==0){
					$('#nameErr').html('用户名不存在');
					}
					else if(data==2)
					{
					$('#pwdErr').html('密码错误');
					}
					else{
							localStorage.setItem("username",name);
							window.location.href='newindex.html';
			
					}
				},
				error:function(){
				}
			});
			}
		});