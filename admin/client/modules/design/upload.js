var React = require('react');
var Config = require('../../config');

var Upload = React.createClass({
	design: null,
	items: [],
	componentDidMount: function(){
		$('#uploadForm').submit(function() {
	        $(this).ajaxSubmit({
	            error: function(xhr) {
	          		status('Error: ' + xhr.status);
	            },
	            success: function(response) {
	            	alert('success');
	            }
	    	});
	    	return false;
	   	});
	},
	init: function(item){
		var self = this;
		this.design = item;
		$.post(Config.IP+'admin/design/json/listItems', {design_id: this.design.id})
		.then(function(data){
			$('input[type=checkbox]').prop('checked', false);
			self.items = data.list;
			self.forceUpdate(function(){
				
			});
		})
	},
	_onAddItem: function(){
		var design_name = $(this.refs.design_name).val();
		var items = [
			{product_id: 1, design_id: this.design.id, price: 179, selected: 0, image: design_name+'_a1'},
			{product_id: 2, design_id: this.design.id, price: 149, selected: 0, image: design_name+'_a3'},
			{product_id: 3, design_id: this.design.id, price: 199, selected: 0, image: design_name+'_a5'},
			{product_id: 4, design_id: this.design.id, price: 149, selected: 0, image: design_name+'_a7'},
			{product_id: 5, design_id: this.design.id, price: 179, selected: 0, image: design_name+'_a9'},
			{product_id: 6, design_id: this.design.id, price: 149, selected: 0, image: design_name+'_a11'},
			{product_id: 7, design_id: this.design.id, price: 149, selected: 0, image: design_name+'_a13'},
			{product_id: 8, design_id: this.design.id, price: 199, selected: 0, image: design_name+'_a15'},
			{product_id: 9, design_id: this.design.id, price: 109, selected: 0, image: design_name+'_a17'},
			{product_id: 10, design_id: this.design.id, price: 99, selected: 0, image: design_name+'_a19'}
		];

		$.post(Config.IP+'admin/design/json/addItems', {rows: items})
		.then(function(data){
			window.location.reload();
		})
	},
	_onCheckbox: function(item){
		$.post(Config.IP+'admin/design/json/selectItem', {id: item.id, design_id: this.design.id})
		.then(function(data){
			window.location.reload();
		})
	},
	_checkSubItems: function(item){
		$.post(Config.IP+'admin/design/json/listSubItems', {item_id: item.id})
		.then(function(data){
			if(data.list.length > 0)
				alert('yes');
			else
				alert('no');
		})
	},
	render: function(){
		return(
			<div>
				<form id="uploadForm"
          			encType="multipart/form-data"
          			action="/admin/design/json/uploadItems"
          			method="post">
	      			<input type="file" name="items" multiple/>
	      			<input type="submit" value="Upload Image" name="submit"/>
    			</form>
    			<div>
    				<button onClick={this._onAddItem}>Thêm Item</button><br/>
    				<ul>
    				{
    					this.items.map(function(item, index){
    						if(item.selected !== 0)
    							var checkbox = <input type="checkbox" onClick={this._onCheckbox.bind(this, item)} checked={true}/>;
    						else
    							var checkbox = <input type="checkbox" onClick={this._onCheckbox.bind(this, item)}/>;
    						return (
    							<li key={index}>
    								<a>{item.name}</a>
    								&nbsp;
    								<button onClick={this._checkSubItems.bind(this, item)}>Check Sub Items</button>
    								&nbsp;
    								{checkbox}
    							</li>
    						)
    					},this)
    				}
    				</ul>
    				Tên design:<br/>
    				<input type="text" ref="design_name"/><br/>
    			</div>
			</div>
		)
	}
});

module.exports = Upload;