var React = require('react');
var Config = require('../../config');

var Add = React.createClass({
	_onAdd: function(){
		var self = this;
		var json = {
			name: $(this.refs.name).val(),
			love: $(this.refs.love).val(),
			views: $(this.refs.views).val(),
			content: $(this.refs.content).val(),
			seo: $(this.refs.seo).val()
		}

		$.post(Config.IP+'admin/design/json/add', json)
		.then(function(data){
			self._clearForm();
			self.props.onAdd();
		});
	},
	_clearForm: function(){
		$(this.refs.name).val('');
		$(this.refs.seo).val('');
		$(this.refs.love).val(15);
		$(this.refs.views).val(100);
		$(this.refs.content).val('');
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
					<label htmlFor="add_seo">SEO</label>
					<br/>
					<input type="text" id="add_seo" ref="seo" name="seo"/>
				</p>
				<p>
					<label htmlFor="add_love">Yêu thích</label>
					<br/>
					<input type="text" id="add_love" ref="love" name="love" defaultValue="15"/>
				</p>
				<p>
					<label htmlFor="add_views">Lượt xem</label>
					<br/>
					<input type="text" id="add_views" ref="views" name="views" defaultValue="100"/>
				</p>
				<p>
					<label htmlFor="add_content">Nội dung</label>
					<br/>
					<textarea id="add_content" ref="content" name="content"></textarea>
				</p>
			</div>
		)
	}
});

module.exports = Add;