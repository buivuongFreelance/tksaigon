var React = require('react');
var Config = require('../../config');
var Tag = require('./tag');
var TagSelect = require('../tag/select');
var FileUpload = require('./upload');

var Info = React.createClass({
	item: null,
	init: function(item){
		this.item = item;
		this.refs.tag.init(item);
		this.refs.fileUpload.init(item);
		$(this.refs.tabTags).show();
	},
	_onClickItem: function(l){
		this.refs.tag.addItem(l);
	},
	_onShowTab: function(type){
		var self = this;
		type = 'tab'+type;
		var types = ['tabTags', 'tabUpload'];
		types.map(function(t){
			if(t === type)
				$(self.refs[type]).show();
			else
				$(self.refs[t]).hide();
		});
	},
	render: function(){
		return(
			<div>
				<a onClick={this._onShowTab.bind(this, 'Tags')}>Thẻ</a>
				&nbsp;|&nbsp;
				<a onClick={this._onShowTab.bind(this, 'Upload')}>Úp ảnh</a>
				<br/>
				<div ref="tabTags" style={{display: 'none'}}>
					<div className="half">
						<Tag ref="tag"/>
					</div>
					<div className="half">
						<TagSelect ref="tagSelect" onClickItem={this._onClickItem}/>
					</div>
				</div>
				<div ref="tabUpload" style={{display: 'none'}}>
					<FileUpload ref="fileUpload"/>
				</div>
			</div>
		)
	}
});

module.exports = Info;