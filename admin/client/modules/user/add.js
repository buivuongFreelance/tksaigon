var React = require('react');
var Config = require('../../config');

var Add = React.createClass({
	_previewImage: function(){
		var avatar = $(this.refs.avatar).val();
		if(avatar){
			$(this.refs.previewImage).attr('src', '/images/user/'+avatar);
		}
	},
	_onAdd: function(){
		var self = this;
		var name = $(this.refs.name).val();
		var avatar = $(this.refs.avatar).val();

		$.post(Config.IP+'admin/user/json/add', {name: name, avatar: avatar})
		.then(function(data){
			self._clearForm();
			self.props.onAdd();
		});
	},
	_clearForm: function(){
		$(this.refs.previewImage).attr('src', '');
		$(this.refs.name).val('');
		$(this.refs.avatar).val('');
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
					<label htmlFor="add_name">Tên người dùng</label>
					<br/>
					<input type="text" id="add_name" ref="name" name="name"/>
				</p>
				<p>
					<label htmlFor="add_avatar">Ảnh Avatar</label>
					<br/>
					<input type="text" id="add_avatar" ref="avatar" name="avatar"/>
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

module.exports = Add;