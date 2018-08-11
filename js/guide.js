var mySwiper = new Swiper('.swiper-container',{
		pagination : '.swiper-pagination',
		direction:'horizontal',
		});
		//$(function(){
			$('.enjoy').click(function(){
				localStorage.setItem("install",true);
				window.location.href='newindex.html';
		});