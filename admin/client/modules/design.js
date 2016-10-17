var React = require('react');
var ReactDOM = require('react-dom');
var List = require('./design/list');
var Add = require('./design/add');
var Edit = require('./design/edit');
var DesignInfo = require('./design/info');

var Design = React.createClass({
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
	_onClickItem: function(l){
		this.refs.designInfo.init(l);
	},
	render: function(){
		return (
			<div>
				<div id="main-content">
					<List ref="list" onEdit={this._onShowEdit} onClickItem={this._onClickItem}/>
				</div>
				<div id="side-content">
					<button type="button" onClick={this._modeAddHide} style={{display: 'none'}} ref="modeAdd">Chế độ Thêm</button>
					<Add onAdd={this._onAdd} ref="add"/>
					<Edit onEdit={this._onEdit} ref="edit"/>
				</div>
				<div id="add-content">
					<DesignInfo ref="designInfo"/>
				</div>
			</div>
		)
	}
});

ReactDOM.render(
  <Design/>,
  document.getElementById('app')
);