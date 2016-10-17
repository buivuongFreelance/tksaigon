var React = require('react');
var Config = require('../../config');
var Dropdown = require('../../dropdown');

var Add = React.createClass({
	_onAdd: function(){
		var self = this;
		var name = $(this.refs.name).val();
		var type = $(this.refs.type).val();
		var price = $(this.refs.price).val();
		var description = $(this.refs.description).val();
		var content = $(this.refs.content).val();
		var love = $(this.refs.love).val();
		var views = $(this.refs.views).val();

		$.post(Config.IP+'admin/product/json/add', {name: name, type: type, price: price, description: description, content: content, love: love, views: views})
		.then(function(data){
			self._clearForm();
			self.props.onAdd();
		});
	},
	_clearForm: function(){
		$(this.refs.name).val('');
		$(this.refs.type).val('tp');
		$(this.refs.price).val('');
		$(this.refs.content).val('');
		$(this.refs.description).val('');
		$(this.refs.love).val('');
		$(this.refs.views).val('');
	},
	show: function(){
		$(this.refs.root).show();
	},
	hide: function(){
		$(this.refs.root).hide();
	},
	render: function(){
		return(
			<div ref="root">
				<p>
					<button onClick={this._onAdd}>Thêm</button>
				</p>
				<p>
					<label htmlFor="add_name">Tên</label>
					<br/>
					<input type="text" id="add_name" ref="name" name="name"/>
				</p>
				<p>
					<label htmlFor="add_type">Loại</label>
					<br/>
					<select id="add_type" ref="type" name="type">
						{
							Dropdown.ProductTypes.map(function(p, i){
								return <option value={p.value} key={i}>{p.name}</option>;
							}, this)
						}
					</select>
				</p>
				<p>
					<label htmlFor="add_price">Giá</label>
					<br/>
					<input type="number" id="add_price" ref="price" name="price"/>
				</p>
				<p>
					<label htmlFor="add_description">Mô tả ngắn</label>
					<br/>
					<input type="text" id="add_description" ref="description" name="description"/>
				</p>
				<p>
					<label htmlFor="add_love">Yêu thích</label>
					<br/>
					<input type="number" id="add_love" ref="love" name="love" defaultValue="50"/>
				</p>
				<p>
					<label htmlFor="add_views">Lượt xem</label>
					<br/>
					<input type="number" id="add_views" ref="views" name="views" defaultValue="50"/>
				</p>
				<p>
					<label htmlFor="add_content">Nội dung</label>
					<br/>
					<textarea id="add_content" name="content" ref="content" rows="10"></textarea>
				</p>
			</div>
		)
	}
});

module.exports = Add;