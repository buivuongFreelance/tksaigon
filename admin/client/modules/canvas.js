var React = require('react');
var ReactDOM = require('react-dom');
var TShirtForm = require('./canvas/main');
var Config = require('../config');

var Canvas = React.createClass({
	roots: [],
	designName: '',
	componentDidMount: function(){
		this._getRoots();
	},
	_getRoots: function(){
		var self = this;

		this.roots = Config.roots;
		this.forceUpdate(function(){
			self.roots.map(function(root){
				self.refs[root.folder].init(root);
			});
			self.refs.main_design.init({detail: '0,0,650,650'}, 'main');
		});
	},
	_onChangeImage: function(file){
		var self = this;
		this.refs.main_design.changeImage(file, 'main').then(function(){
			self.refs.a1.changeImage(file).then(function(){
				self.refs.a2.changeImage(file).then(function(){
					self.refs.a3.changeImage(file).then(function(){
						self.refs.a4.changeImage(file).then(function(){
							self.refs.a5.changeImage(file).then(function(){
								self.refs.a6.changeImage(file).then(function(){
									self.refs.a7.changeImage(file).then(function(){
										self.refs.a8.changeImage(file).then(function(){
											self.refs.a9.changeImage(file).then(function(){
												self.refs.a10.changeImage(file).then(function(){
													self.refs.a11.changeImage(file).then(function(){
														self.refs.a13.changeImage(file).then(function(){
															self.refs.a14.changeImage(file).then(function(){
																self.refs.a15.changeImage(file).then(function(){
																	self.refs.a16.changeImage(file).then(function(){
																		self.refs.a17.changeImage(file).then(function(){
																			self.refs.a18.changeImage(file).then(function(){
																				self.refs.a19.changeImage(file).then(function(){
																					self.refs.a20.changeImage(file).then(function(){
																					});
																				});
																			});
																		});
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	},
	_onChangeDesignName: function(event){
		this.designName = event.target.value;
	},
	_onSave: function(size){
		var self = this;
		this.refs.main_design.saveImage(this.designName, size).then(function(){
			self.refs.a1.saveImage(self.designName, size).then(function(){
				self.refs.a2.saveImage(self.designName, size).then(function(){
					self.refs.a3.saveImage(self.designName, size).then(function(){
						self.refs.a4.saveImage(self.designName, size).then(function(){
							self.refs.a5.saveImage(self.designName, size).then(function(){
								self.refs.a6.saveImage(self.designName, size).then(function(){
									self.refs.a7.saveImage(self.designName, size).then(function(){
										self.refs.a8.saveImage(self.designName, size).then(function(){
											self.refs.a9.saveImage(self.designName, size).then(function(){
												self.refs.a10.saveImage(self.designName, size).then(function(){
													self.refs.a11.saveImage(self.designName, size).then(function(){
														self.refs.a13.saveImage(self.designName, size).then(function(){
															self.refs.a14.saveImage(self.designName, size).then(function(){
																self.refs.a15.saveImage(self.designName, size).then(function(){
																	self.refs.a16.saveImage(self.designName, size).then(function(){
																		self.refs.a17.saveImage(self.designName, size).then(function(){
																			self.refs.a18.saveImage(self.designName, size).then(function(){
																				self.refs.a19.saveImage(self.designName, size).then(function(){
																					self.refs.a20.saveImage(self.designName, size).then(function(){
																					});
																				});
																			});
																		});
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	},
	render: function(){
		return (
			<div>
				<div>
					Tên design <input ref="design" onChange={this._onChangeDesignName}/><br/>
					<button onClick={this._onSave.bind(this, 560)}>Save ảnh</button>
					<button onClick={this._onSave.bind(this, 350)}>Save ảnh nhỏ</button>
					<button onClick={this._onSave.bind(this, 120)}>Save ảnh avatar</button>
				</div>
				<div className="grid">
					<TShirtForm ref="main_design" onChangeImage={this._onChangeImage}/>
				</div>
				{
					this.roots.map(function(root, index){
						return (
							<div key={index} className="grid">
								<TShirtForm ref={root.folder} onChangeImage={this._onChangeImage}/>
							</div>
						)
					}, this)
				}
			</div>
		)
	}
});

ReactDOM.render(
  <Canvas/>,
  document.getElementById('app')
);