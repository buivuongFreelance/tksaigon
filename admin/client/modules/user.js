var React = require('react');
var ReactDOM = require('react-dom');
var UserList = require('./user/list');
var UserAdd = require('./user/add');
var UserEdit = require('./user/edit');

var User = React.createClass({
	_onAdd: function(){
		this.refs.userList.refresh();
	},
	_onShowEdit: function(json){
		this.refs.userEdit.init(json);
		this._modeAddShow();
	},
	_onEdit: function(){
		this.refs.userList.refresh();
		this._modeAddHide();
	},
	_modeAddShow: function(){
		$(this.refs.modeAdd).show();
		this.refs.userEdit.show();
		this.refs.userAdd.hide();
	},
	_modeAddHide: function(){
		$(this.refs.modeAdd).hide();
		this.refs.userEdit.hide();
		this.refs.userAdd.show();
	},
	render: function(){
		return (
			<div>
				<div id="main-content">
					<UserList ref="userList" onEdit={this._onShowEdit}/>
				</div>
				<div id="side-content">
					<button type="button" onClick={this._modeAddHide} style={{display: 'none'}} ref="modeAdd">Chế độ Thêm</button>
					<UserAdd onAdd={this._onAdd} ref="userAdd"/>
					<UserEdit onEdit={this._onEdit} ref="userEdit"/>
				</div>
			</div>
		)
	}
});

ReactDOM.render(
  <User/>,
  document.getElementById('app')
);