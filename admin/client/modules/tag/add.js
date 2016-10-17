var React = require('react');
var Config = require('../../config');

var Add = React.createClass({
	_onAdd: function(){
		var self = this;
		var code = $(this.refs.code).val();
		var name = $(this.refs.name).val();

		$.post(Config.IP+'admin/tag/json/add', {code: code, name: name})
		.then(function(data){
			self._clearForm();
			self.props.onAdd();
		});
	},
	_clearForm: function(){
		$(this.refs.name).val('');
		$(this.refs.code).val('');
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
					<label htmlFor="add_code">Code</label>
					<br/>
					<input type="text" id="add_code" ref="code" name="code"/>
				</p>
				<p>
					<label htmlFor="add_name">Tên</label>
					<br/>
					<input type="text" id="add_name" ref="name" name="name"/>
				</p>
			</div>
		)
	}
});

module.exports = Add;