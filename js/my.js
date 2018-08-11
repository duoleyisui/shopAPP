var userId=localStorage.getItem('username');
		//跳转设置
		$('#set').click(function(){
		if(userId){
			window.location.href="set.html";
		}
		else{
//			alert('请先登录');
			window.location.href="login.html";
		}
		});
        $('.btn').click(function(){
			localStorage.removeItem("username");
	        window.location.href="login.html";
		});
		//var userId=localStorage.getItem('username');
		$.ajax({
				type:"get",
				url:'http://datainfo.duapp.com/shopdata/getuser.php',
				dataType:'jsonp',
				data:{userID:userId},
				success:function(data){
					console.log(data);
					$('.username').html(data[0].userID);
				},
				error:function(){
				}
			});