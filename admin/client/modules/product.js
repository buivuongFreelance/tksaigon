var React = require('react');
var ReactDOM = require('react-dom');
var ProductList = require('./product/list');
var ProductAdd = require('./product/add');
var ProductEdit = require('./product/edit');
var ProductComment = require('./product/comment');

var Product = React.createClass({
	_onAdd: function(){
		this.refs.productList.refresh();
	},
	_onShowEdit: function(json){
		this.refs.productEdit.init(json);
		this._modeAddShow();
	},
	_onEdit: function(){
		this.refs.productList.refresh();
		this._modeAddHide();
	},
	_modeAddShow: function(){
		$(this.refs.modeAdd).show();
		this.refs.productEdit.show();
		this.refs.productAdd.hide();
	},
	_modeAddHide: function(){
		$(this.refs.modeAdd).hide();
		this.refs.productEdit.hide();
		this.refs.productAdd.show();
	},
	_onShowAddi: function(l){
		this.refs.productComment.init(l);
		this.refs.addFormula(bind);

		var image = new Image();
		image.width = 100;
		image.height = 600;
		
	},
	_onUpdateImages: function(){
		this.refs.productList.refresh();
	},
	render: function(){
		return (
			<div>
				<div id="main-content">
					<ProductList ref="productList" onEdit={this._onShowEdit} onAddi={this._onShowAddi}/>
				</div>
				<div id="side-content">
					<button type="button" onClick={this._modeAddHide} style={{display: 'none'}} ref="modeAdd">Chế độ Thêm</button>
					<ProductAdd onAdd={this._onAdd} ref="productAdd"/>
					<ProductEdit onEdit={this._onEdit} ref="productEdit"/>
				</div>
				<div id="add-content">
					<ProductComment ref="productComment" onUpdateImages={this._onUpdateImages}/>
				</div>
			</div>
		)
	}
});

ReactDOM.render(
  <Product/>,
  document.getElementById('app')
);