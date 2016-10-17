var React = require('react');
var Config = require('../../config');

var Comment = React.createClass({
	list: [],
	product: null,
	init: function(json){
		this.product = json;
		this._getList();
	},
	_updateComment: function(l, e){
		var self = this;
		if(e.keyCode == 13 && e.shiftKey){
			$.post(Config.IP+'admin/product/comment/user/update', {comment_id: l.id, content: e.target.value})
			.then(function(data){
				self._getList();
			});
		}
	},
	_getList: function(){
		var self = this;
		$.post(Config.IP+'admin/product/comment/list', {product_id: this.product.id})
		.then(function(data){
			self.list = data.list;
			self.forceUpdate(function(){

			});
		});
	},
	refresh: function(){
		this._getList();
	},
	_onReplyComment: function(user_id, comment_id){
		var self = this;
		$.post(Config.IP+'admin/product/comment/user/select', {user_id: user_id, product_id: this.product.id, parent: comment_id})
		.then(function(data){
			self.props.onReply();
		});
	},
	render: function(){
		return (
			<ul>
				{
					this.list.map(function(l, i){
						var children = null;
						if(typeof l.list === 'undefined')
							l.list = [];
						return (
							<li key={i}>
								{l.name} <button onClick={this._onReplyComment.bind(this, 11, l.id)}>Ad Trả lời</button> <button onClick={this._onReplyComment.bind(this, l.user_id, l.id)}>Tự trả lời</button>
								<textarea onKeyUp={this._updateComment.bind(this, l)} defaultValue={l.content}></textarea>
								<ul>
								{
									l.list.map(function(c, c_i){
										return (
											<li key={c_i}>
												{c.name}
												<textarea onKeyUp={this._updateComment.bind(this, c)} defaultValue={c.content}></textarea>
											</li>
										)
									}, this)
								}
								</ul>
							</li>
						)
					}, this)
				}
			</ul>
		);
	}
});

module.exports = Comment;