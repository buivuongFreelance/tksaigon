var React = require('react');
var Config = require('../../config');

var Edit = React.createClass({
	id: null,
	_previewImage: function(){
		var avatar = $(this.refs.avatar).val();
		if(avatar){
			$(this.refs.previewImage).attr('src', '/images/user/'+avatar);
		}
	},
	_onEdit: function(){
		var self = this;
		var name = $(this.refs.name).val();
		var avatar = $(this.refs.avatar).val();

		$.post(Config.IP+'admin/user/json/edit', {name: name, avatar: avatar, id: this.id})
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
		$(this.refs.avatar).val(json.avatar);
		$(this.refs.previewImage).attr('src', '/images/user/'+json.avatar);
	},
	render: function(){
		return(
			<div ref="root" style={{display: 'none'}}>
				<p>
					<button onClick={this._onEdit}>Sửa</button>
				</p>
				<p>
					<label htmlFor="edit_name">Tên người dùng</label>
					<br/>
					<input type="text" id="edit_name" ref="name" name="name"/>
				</p>
				<p>
					<label htmlFor="edit_avatar">Ảnh Avatar</label>
					<br/>
					<input type="text" id="edit_avatar" ref="avatar" name="avatar"/>
				</p>
				<p>
					<button onClick={this._previewImage}>Xem trước</button>
					<br/>
					<img ref="previewImage" width="150" height="150"/>
				</p>
			</div>
		)
	}
});

module.exports = Edit;