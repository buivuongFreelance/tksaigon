var React = require('react');
var Config = require('../../config');

var List = React.createClass({
	list: [],
	componentDidMount: function(){
		this._getUserList();
	},
	refresh: function(){
		this._getUserList();
	},
	_getUserList: function(){
		var self = this;
		$.get(Config.IP+'admin/user/json/list')
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
	render: function(){
		return (
			<table ref="list" className="display" cellSpacing="0" width="100%">
				<thead>
		            <tr>
		                <th>#</th>
		                <th>Ảnh</th>
		                <th>Tên</th>
		                <th></th>
		            </tr>
		        </thead>
		        <tbody>
		        	{
		        		this.list.map(function(l, i){
		        			var avatar = "/images/user/"+l.avatar;
		        			return (
		        				<tr key={i}>
		        					<td>{i+1}</td>
		        					<td><img src={avatar} width="35" height="35"/></td>
		        					<td>{l.name}</td>
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