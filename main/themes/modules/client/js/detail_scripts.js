// on document ready
(function($){
	$('#buy_form').bind('submit', function(event){
		event.preventDefault();
		var json = $('#buy_form').serializeArray();
		var quantity = $('#quantity').val();
		var child_size = $('#child_size').val();
		var size = $('#size').val();
		var item_id = $('#item_id').val();
		var image = "http://tksaigon.com/images/items/"+$('#image').val()+'_560.jpeg';

		$.post('/api/buy', {form: json, quantity: quantity, child_size: child_size, size: size, item_id: item_id, image: image}, function(data){
			toastr.success('Đơn hàng thành công. TKSaigon chân thành cám ơn bạn vì đã mua hàng của chúng tôi.');
			$('#buy_form')[0].reset();
			$('.popup_wrap').fadeOut();
		});
	});
})(jQuery);