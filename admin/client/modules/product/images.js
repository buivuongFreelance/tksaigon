var React = require('react');
var Config = require('../../config');

var Images = React.createClass({
	product: {
		images: ''
	},
	images: [],
	init: function(product){
		var self = this;
		this.product = product;
		this.images = [];
		$(this.refs.images).val(this.product.images);
		this.product.images.split(',').map(function(image){
			self.images.push(image);
		});
		this.forceUpdate();
	},
	_onUpdateImages: function(){
		var images = $(this.refs.images).val();
		var self = this;
		$.post(Config.IP+'admin/product/json/editImages', {id: this.product.id, images: images})
		.then(function(data){
			self.props.onUpdate();
		});
	},
	render: function(){
		return(
			<div>
				<textarea ref="images" defaultValue={this.product.images}></textarea>
				<button onClick={this._onUpdateImages}>Cập nhật ảnh</button>
				<br/>
				<div className="group-images">
					{
						this.images.map(function(photo, index){
							console.log(photo);
							return <div key={index} className="image"><img src={"/images/product/tshirt/"+photo}/></div>
						},this)
					}
				</div>
			</div>
		)
	}
});

module.exports = Images;