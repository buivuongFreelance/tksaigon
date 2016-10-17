var React = require('react');
var Config = require('../../config');

var Edit = React.createClass({
	id: null,
	_onEdit: function(){
		var self = this;
		var name = $(this.refs.name).val();
		var code = $(this.refs.code).val();

		$.post(Config.IP+'admin/tag/json/edit', {name: name, code: code, id: this.id})
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
		$(this.refs.code).val(json.code);
	},
	render: function(){
		return(
			<div ref="root" style={{display: 'none'}}>
				<p>
					<button onClick={this._onEdit}>Sửa</button>
				</p>
				<p>
					<label htmlFor="edit_code">Code</label>
					<br/>
					<input type="text" id="edit_code" ref="code" name="code"/>
				</p>
				<p>
					<label htmlFor="edit_name">Tên</label>
					<br/>
					<input type="text" id="edit_name" ref="name" name="name"/>
				</p>
			</div>
		)
	}
});

module.exports = Edit;