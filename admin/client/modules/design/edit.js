var React = require('react');
var Config = require('../../config');

var Edit = React.createClass({
	id: null,
	_onEdit: function(){
		var self = this;
		var json = {
			name: $(this.refs.name).val(),
			love: $(this.refs.love).val(),
			views: $(this.refs.views).val(),
			content: $(this.refs.content).val(),
			seo: $(this.refs.seo).val(),
			id: this.id
		}

		$.post(Config.IP+'admin/design/json/edit', json)
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
		$(this.refs.love).val(json.love);
		$(this.refs.views).val(json.views);
		$(this.refs.content).val(json.content);
		$(this.refs.seo).val(json.seo);
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
					<label htmlFor="edit_seo">SEO</label>
					<br/>
					<input type="text" id="edit_seo" ref="seo" name="seo"/>
				</p>
				<p>
					<label htmlFor="edit_love">Yêu thích</label>
					<br/>
					<input type="text" id="edit_love" ref="love" name="love" defaultValue="15"/>
				</p>
				<p>
					<label htmlFor="edit_views">Lượt xem</label>
					<br/>
					<input type="text" id="edit_views" ref="views" name="views" defaultValue="100"/>
				</p>
				<p>
					<label htmlFor="edit_content">Nội dung</label>
					<br/>
					<textarea id="edit_content" ref="content" name="content"></textarea>
				</p>
			</div>
		)
	}
});

module.exports = Edit;