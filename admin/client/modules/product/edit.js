var React = require('react');
var Config = require('../../config');
var Dropdown = require('../../dropdown');

var Edit = React.createClass({
	id: null,
	_onEdit: function(){
		var self = this;
		var name = $(this.refs.name).val();
		var type = $(this.refs.type).val();
		var price = $(this.refs.price).val();
		var description = $(this.refs.description).val();
		var content = $(this.refs.content).val();
		var love = $(this.refs.love).val();
		var views = $(this.refs.views).val();

		$.post(Config.IP+'admin/product/json/edit', {name: name, type: type, price: price, description: description, content: content, love: love, views: views, id: this.id})
		.then(function(data){
			self.props.onEdit();
		});
	},
	show: function(){
		$(this.refs.root).show();
	},
	hide: function(){
		$(this.refs.root).hide();
	},
	init: function(json){
		this.id = json.id;
		$(this.refs.name).val(json.name);
		$(this.refs.type).val(json.type);
		$(this.refs.description).val(json.description);
		$(this.refs.content).val(json.content);
		$(this.refs.price).val(json.price);
		$(this.refs.love).val(json.love);
		$(this.refs.views).val(json.views);
	},
	render: function(){
		return(
			<div ref="root" style={{display: 'none'}}>
				<p>
					<button onClick={this._onEdit}>Sửa</button>
				</p>
				<p>
					<label htmlFor="edit_name">Tên</label>
					<br/>
					<input type="text" id="edit_name" ref="name" name="name"/>
				</p>
				<p>
					<label htmlFor="edit_type">Loại</label>
					<br/>
					<select id="edit_type" ref="type" name="type">
						{
							Dropdown.ProductTypes.map(function(p, i){
								return <option value={p.value} key={i}>{p.name}</option>;
							}, this)
						}
					</select>
				</p>
				<p>
					<label htmlFor="edit_price">Giá</label>
					<br/>
					<input type="number" id="edit_price" ref="price" name="price"/>
				</p>
				<p>
					<label htmlFor="edit_description">Mô tả ngắn</label>
					<br/>
					<input type="text" id="edit_description" ref="description" name="description"/>
				</p>
				<p>
					<label htmlFor="edit_love">Yêu thích</label>
					<br/>
					<input type="number" id="edit_love" ref="love" name="love"/>
				</p>
				<p>
					<label htmlFor="edit_views">Lượt xem</label>
					<br/>
					<input type="number" id="edit_views" ref="views" name="views"/>
				</p>
				<p>
					<label htmlFor="edit_content">Nội dung</label>
					<br/>
					<textarea id="edit_content" name="content" ref="content" rows="10"></textarea>
				</p>
			</div>
		)
	}
});

module.exports = Edit;