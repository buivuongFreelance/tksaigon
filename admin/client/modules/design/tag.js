var React = require('react');
var Config = require('../../config');

var Tag = React.createClass({
	list: [],
	design: null,
	init: function(l){
		this.design = l;
		var self = this;
		$.post(Config.IP+'admin/design/json/listTags', {design_id: l.id})
		.then(function(data){
			self.list = data.list;
			self.forceUpdate(function(){

			});
		})
	},
	addItem: function(l){
		this.list.push(l);
		this.forceUpdate();
	},
	_onAddItems: function(){
		var self = this;
		var rows = [];
		this.list.map(function(l, index){
			rows.push({design_id: self.design.id, tag_id: l.id});
		}, this);

		$.post(Config.IP+'admin/design/json/addTags', {rows: rows, design_id: this.design.id})
		.then(function(data){
			window.location.reload();
		});
	},
	_onRemoveItem: function(index){
		this.list.splice(index, 1);
		this.forceUpdate();
	},
	render: function(){
		return(
			<div>
				<button onClick={this._onAddItems}>Thêm</button>
				<ul>
					{
						this.list.map(function(item, index){
							return <li key={index}>{item.name} <a onClick={this._onRemoveItem.bind(this, index)}>Xóa</a></li>
						}, this)
					}
				</ul>
			</div>
		)
	}
});

module.exports = Tag;