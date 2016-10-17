var React = require('react');
var Config = require('../../config');

var List = React.createClass({
	list: [],
	componentDidMount: function(){
		this._getProductList();
	},
	refresh: function(){
		this._getProductList();
	},
	_getProductList: function(){
		var self = this;
		$.get(Config.IP+'admin/product/json/list')
		.then(function(data){
			self.list = data.list;
			self.forceUpdate(function(){
				$(self.refs.list).DataTable();
			});
		})
	},
	_onEdit: function(l){
		this.props.onEdit(l);
	},
	_onAddi: function(l){
		this.props.onAddi(l);
	},
	render: function(){
		return (
			<table ref="list" className="display" cellSpacing="0" width="100%">
				<thead>
		            <tr>
		                <th>#</th>
		                <th>Tên</th>
		                <th>Yêu thích</th>
		                <th>Lượt xem</th>
		                <th></th>
		            </tr>
		        </thead>
		        <tbody>
		        	{
		        		this.list.map(function(l, i){
		        			return (
		        				<tr key={i}>
		        					<td>{i+1}</td>
		        					<td><a onClick={this._onAddi.bind(this, l)}>{l.name}</a></td>
		        					<td>{l.love}</td>
		        					<td>{l.views}</td>
		        					<td><a onClick={this._onEdit.bind(this, l)}>Sửa</a></td>
		        				</tr>
		        			)
		        		}.bind(this))
		        	}
		        </tbody>
			</table>
		)
	}
});

module.exports = List;