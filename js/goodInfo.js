        var mySwiper = new Swiper('.swiper-container',{
		pagination : '.swiper-pagination',
         // 如果需要滚动条
		});
		$('#goback').click(function(){
			window.history.back();
		});
		var goodsId=window.location.hash.slice(1);//
		//console.log(goodsId);
		$.ajax({
				type:"get",
				url:'http://datainfo.duapp.com/shopdata/getGoods.php',
				dataType:'jsonp',
				data:{goodsID:goodsId},
				success:function(data){
					//console.log(data);
					//console.log(data[0].goodsName);
					$('#title').html(data[0].goodsName);
					$('#price').html('¥'+data[0].price);
				},
				error:function(){
				}
			});
		$.ajax({
			type:"get",
			url:'http://datainfo.duapp.com/shopdata/getGoods.php',
			dataType:'jsonp',
			data:{goodsID:goodsId},
			success:function(data){
				//console.log(data);
				var banners=document.getElementsByClassName('swiper-slide');
				var val=eval(data[0].imgsUrl);
				for(var i=0;i<4;i++){
				    $(banners[i]).html('<img src="'+val[i]+'">');
				}
			},
			error:function(){
			}
		});
		
		//添加购物车
		$('.addCar').click(function(){
			var user=localStorage.getItem('username');
			if(!user){
		       location.href = 'login.html';
	       }
//			else{
			console.log(user);
			$.ajax({
				type:"get",
				url:'http://datainfo.duapp.com/shopdata/updatecar.php',
				data:{userID:user,goodsID:goodsId},
				success:function(data){
					if(data==1){
                        $ ('#added').show ().delay (1000).fadeOut ();
					}
					else{
						alert('添加失败');
					}
				},
				error:function(){
				}
			});
			//}
		});
		
