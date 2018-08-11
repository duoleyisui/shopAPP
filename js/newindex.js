if(!localStorage.getItem('install')){
			location.href = 'guide.html';
		}
		$(function(){
		  $('.wrapper').navbarscroll();
	    });
	    //搜索请求
	    $('#sousuo').click(function(){
       	var word=encodeURI($('#search').val());
		 	console.log(word);
		 	$.ajax({
			type:"get",
			url:'http://datainfo.duapp.com/shopdata/selectGoodes.php',
			dataType:'jsonp',
			data:{selectText:word},
			success:function(data){
				console.log(data);
				var content=document.getElementsByClassName('content');
				$(content).html('');
				var str='';
					for(var i=0;i<data.length;i++){
						//console.log(data[i].goodsID);
						str+='<div class="item1" goodsId="'+data[i].goodsID+'"style="background-image:url('+data[i].goodsListImg+');"><img src="img/star1.png" class="star"><div class="inbox"><span id="txt">'+data[i].goodsName.slice(0,10)+'</span></div></div>';
					}
					$(content).html(str);
					$('.item1').on('click',function(){
       	            window.location.href='goodInfo.html#'+this.getAttribute('goodsId');//传goodsId
                });
			},
			error:function(){
			}
		  });
       });
	    
		var mySwiper = new Swiper('.swiper-container',{
			pagination : '.swiper-pagination',
			autoplay: 2000,
			loop:true
	         // 如果需要滚动条
		})
		 $('#scroll > li').click(function(){
		 	var classId=this.getAttribute('classID');
		 	console.log(classId);
		 	$.ajax({
			type:"get",
			url:'http://datainfo.duapp.com/shopdata/getGoods.php',
			dataType:'jsonp',
			data:{classID:classId},
			success:function(data){
				console.log(data);
				var content=document.getElementsByClassName('content');
				$(content).html('');
				var str='';
					for(var i=0;i<10;i++){
						//console.log(data[i].goodsID);
						str+='<div class="item1" goodsId="'+data[i].goodsID+'"style="background-image:url('+data[i].goodsListImg+');"><img src="img/star1.png" class="star"><div class="inbox"><span id="txt">'+data[i].goodsName.slice(0,10)+'</span></div></div>';
					}
					$(content).html(str);
					$('.item1').on('click',function(){
       	            window.location.href='goodInfo.html#'+this.getAttribute('goodsId');//传goodsId
                });
			},
			error:function(){
			}
		  });
		 });
		//获取默认首页推荐商品列表
		 $.ajax({
				type:"get",
				url:'http://datainfo.duapp.com/shopdata/getGoods.php',
				dataType:'jsonp',
				success:function(data){
					//console.log(data);
					var content=document.getElementsByClassName('content');
					var str='';
					for(var i=0;i<10;i++){
						//console.log(data[i].goodsID);
						str+='<div class="item1" goodsId="'+data[i].goodsID+'"style="background-image:url('+data[i].goodsListImg+');"><img src="img/star1.png" class="star"><div class="inbox"><span id="txt">'+data[i].goodsName.slice(0,10)+'</span></div></div>';
					}
					$(content).html(str);
					$('.item1').on('click',function(){
       	            window.location.href='goodInfo.html#'+this.getAttribute('goodsId');//传goodsId
                });
				},
				error:function(){
				}
			});
			//获取banner图
		$.ajax({
			type:"get",
			url:'http://datainfo.duapp.com/shopdata/getBanner.php',
			dataType:'jsonp',
			success:function(data){
				console.log(data);
				var banners=document.getElementsByClassName('swiper-slide');
				for(var i=0;i<4;i++){
					var val=eval(data[i].goodsBenUrl);
				    //console.log(val[0]);

				    $(banners[i+1]).html('<img src="'+val[0]+'">');
				}
				$(banners[0]).html('<img src="'+eval(data[3].goodsBenUrl)[0]+'">');
				$(banners[5]).html('<img src="'+eval(data[0].goodsBenUrl)[0]+'">');
//				setInterval("mySwiper.slidePrev()", 2000);
			},
			error:function(){
			}
		});
//		 });
//     ``换行无所谓