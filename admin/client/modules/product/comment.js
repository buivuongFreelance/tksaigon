var React = require('react');
var Config = require('../../config');
var UserList = require('../user/select');
var Comments = require('./reply');
var Images = require('./images');

var Comment = React.createClass({
	product: {
		name: ''
	},
	init: function(json){
		this.product = json;
		this.refs.comment.init(this.product);
		this.refs.images.init(this.product);
		$(this.refs.tabImages).show();
		this.forceUpdate();
	},
	_onAddUser: function(user){
		var self = this;
		$.post(Config.IP+'admin/product/comment/user/select', {user_id: user.id, product_id: this.product.id, parent: 0})
		.then(function(data){
			self.refs.userList.refresh();
			self.refs.comment.refresh();
		});
	},
	_onReplyComment: function(){
		this.refs.comment.refresh();
	},
	_onUpdateImages: function(){
		this.props.onUpdateImages();
		$(this.refs.tabImages).hide();
	},
	_onShowTab: function(type){
		var self = this;
		type = 'tab'+type;
		var types = ['tabImages', 'tabComments'];
		types.map(function(t){
			if(t === type)
				$(self.refs[type]).show();
			else
				$(self.refs[t]).hide();
		});
	},
	render: function(){
		return (
			<div>
				<a onClick={this._onShowTab.bind(this, 'Images')}>Cập nhật ảnh</a>
				&nbsp;
				<a onClick={this._onShowTab.bind(this, 'Comments')}>Bình luận</a>
				<br/>
				<div ref="tabImages" style={{display: 'none'}}>
					<h3>{this.product.name}</h3>
					<Images ref="images" onUpdate={this._onUpdateImages}/>
				</div>
				<div ref="tabComments" style={{display: 'none'}}>
					<div style={{width: '50%', display: 'inline-block', verticalAlign: 'top', padding: '10px'}}>
						<h3>{this.product.name}</h3>
						<Comments ref="comment" onReply={this._onReplyComment}/>
					</div>
					<div style={{width: '50%', display: 'inline-block'}}>
						<UserList ref="userList" onAdd={this._onAddUser}/>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Comment;