if(!localStorage.getItem('username')){
		location.href = 'login.html';
	}
	var user=localStorage.getItem('username');
	$.ajax({
				type:"get",
				url:'http://datainfo.duapp.com/shopdata/getCar.php',
				dataType:'jsonp',
				data:{userID:user},
				success:function(data){
					//console.log(data);
					var list=document.getElementsByClassName('carList');
					var str='';
					for(var i=0;i<data.length;i++){
						//console.log(data[i]);
						str+='<li class="good">\
						<input type="checkbox" class="choice">\
						<img src="'+data[i].goodsListImg+'" class="li-img-good">\
						<h3 class="goodTitle">'+data[i].goodsName+'</h3>\
						<h4 class="goodPrice">¥'+data[i].price+'</h4>\
						<div class="count">\
							 <button id="del" goodsId="'+data[i].goodsID+'">-</button>\
	                         <span class="number">'+data[i].number+'</span>\
	                         <button id="add" goodsId="'+data[i].goodsID+'">+</button>\
						</div>\
						<img src="img/delete.png" class="li-img-delete" goodsId="'+data[i].goodsID+'">\
					    </li>';
					}
					$(list).html(str);
					$("input[class='choice']").change(function(){  
        		        //alert('hello');
						var allchoice=$('#allchoice')[0];
						var flag=0;
			                var choice = $('.choice');
							for(var i=0;i<choice.length;i++){
								if(!choice[i].checked){
									//console.log(i+':'+choice[i].checked);
									allchoice.checked=false;
									//console.log('all:'+allchoice.checked);
								flag=1;
								}
							}
							if(flag==0){
								allchoice.checked=true;
							}
					});  
					//全选
					    $("#allchoice").click(function(){  
					    	var choice = $('.choice');
						    if($(this).is(":checked")){  
								for(var i=0;i<choice.length;i++){
									choice[i].checked = true;
								}
						    }else{    
						        for(var i=0;i<choice.length;i++){
									choice[i].checked = false;
								}
						    }  
				       });
				     //计算价格
						  $("input[class='choice'],#allchoice").change(function(){
						   	 var money=parseInt($('.really').html());
						     //console.log(money);
						     var result=0;
						     var choice = $('.choice');
						     for(var i=0;i<choice.length;i++){
									if(choice[i].checked){
										var number=parseInt($(choice[i]).nextAll('.count').children('.number').html());
										console.log(number);
										var price=parseInt($(choice[i]).nextAll('.goodPrice').html().slice(1))*number;
										result+=price;
									}
								}
						     $('.really').html(result);
						   });
						//删除商品
							$('.li-img-delete').click(function(){
								var goodsId=$(this).attr('goodsId');
								console.log(goodsId+user); 
								var that = this;
								$.ajax({
									type:"get",
									url:'http://datainfo.duapp.com/shopdata/updatecar.php',
									data:{userID:user,goodsID:goodsId,number:0},
									success:function(data){
										console.log(data);
										$(that).parents('.good').remove();
										var money=parseInt($('.really').html());
						     //console.log(money);
						     var result=0;
						     var choice = $('.choice');
						     for(var i=0;i<choice.length;i++){
									if(choice[i].checked){
										var number=parseInt($(choice[i]).nextAll('.count').children('.number').html());
										console.log(number);
										var price=parseInt($(choice[i]).nextAll('.goodPrice').html().slice(1))*number;
										result+=price;
									}
								}
						     $('.really').html(result);
										
									},
									error:function(){
									}
								});
							});
					    //改变商品数量+
						$('.count > #add').each(function(){
							$(this).click(function(){
							var val=parseInt($(this).prev().html());
							val++;
							$(this).prev().html(val);
							var goodsId=$(this).attr('goodsId');
                            $.ajax({
									type:"get",
									url:'http://datainfo.duapp.com/shopdata/updatecar.php',
									data:{userID:user,goodsID:goodsId,number:val},
									success:function(data){
										console.log(data);
									},
									error:function(){
									}
								});
						});
						});
						//改变商品数量-
						$('.count > #del').each(function(){
							$(this).click(function(){
							var val=parseInt($(this).next().html());
							if(val>1)
							val--;
							else{
							val=1;
							 $ ('#cant').show ().delay (1000).fadeOut ();
							}
							$(this).next().html(val);
							var goodsId=$(this).attr('goodsId');
                            $.ajax({
									type:"get",
									url:'http://datainfo.duapp.com/shopdata/updatecar.php',
									data:{userID:user,goodsID:goodsId,number:val},
									success:function(data){
										console.log(data);
									},
									error:function(){
									}
								});
					});
				});
				},
				error:function(){
				}
			});
	//返回上一页
	$('#back').click(function(){
		window.history.back();
	});