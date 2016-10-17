// on document ready
(function($){
	"use strict";

	$('#contactform').bind('submit', function(event){
		event.preventDefault();
		var json = $('#contactform').serializeArray();

		$.post('/api/contact', json, function(data){
			toastr.success('Bạn đã gửi mail thành công. TKSaigon chân thành cám ơn bạn đã quan tâm với chúng tôi.');
			$('#contactform')[0].reset();
		});
	});

	$('.categories_list').on('click','a',function(e){
		if($(this).parent().children('ul').length){
			$(this).parent().toggleClass('active').end().next().slideToggle();
			e.preventDefault();
		}
	});

	$('.categories_list > li > a').on('click',function(e){
		if($(this).parent().children('ul').length){
			$(this).toggleClass('scheme_color').toggleClass('color_dark');
			e.preventDefault();
		}
	});
})(jQuery);