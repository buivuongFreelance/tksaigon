var React = require('react');
var ReactDOM = require('react-dom');
var List = require('./tag/list');
var Add = require('./tag/add');
var Edit = require('./tag/edit');

var Tag = React.createClass({
	_onAdd: function(){
		this.refs.list.refresh();
	},
	_onShowEdit: function(json){
		this.refs.edit.init(json);
		this._modeAddShow();
	},
	_onEdit: function(){
		this.refs.list.refresh();
		this._modeAddHide();
	},
	_modeAddShow: function(){
		$(this.refs.modeAdd).show();
		this.refs.edit.show();
		this.refs.add.hide();
	},
	_modeAddHide: function(){
		$(this.refs.modeAdd).hide();
		this.refs.edit.hide();
		this.refs.add.show();
	},
	render: function(){
		return (
			<div>
				<div id="main-content">
					<List ref="list" onEdit={this._onShowEdit}/>
				</div>
				<div id="side-content">
					<button type="button" onClick={this._modeAddHide} style={{display: 'none'}} ref="modeAdd">Chế độ Thêm</button>
					<Add onAdd={this._onAdd} ref="add"/>
					<Edit onEdit={this._onEdit} ref="edit"/>
				</div>
			</div>
		)
	}
});

ReactDOM.render(
  <Tag/>,
  document.getElementById('app')
);