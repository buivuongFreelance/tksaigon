var React = require('react');
var Config = require('../../config');

var Main = React.createClass({
	canvas: null,
	context: null,
	root: null,
	init: function(root, type){
		var self = this;
		this.canvas = $(this.refs.canvas)[0];
		this.context = this.canvas.getContext('2d');

		this.root = root;

		if(typeof type === 'undefined'){
			var imageFirst = new Image();
			imageFirst.src = '/images/product/tshirt/root/'+root.folder+'/final.jpg';
			imageFirst.onload = function(){
				self.canvas.width = imageFirst.naturalWidth;
				self.canvas.height = imageFirst.naturalHeight;
				self.context.drawImage(imageFirst, 0, 0, imageFirst.naturalWidth, imageFirst.naturalHeight);
			}
		}else{
			self.canvas.width = 650;
			self.canvas.height = 905;
		}

		$(this.refs.file).change(function(){
			var file = this.files[0];
			self.props.onChangeImage(file);
		});

		$(this.refs.reload).change(function(){
			var file = this.files[0];
			self.changeImage(file);
		});
	},
	changeImage: function(file, type){
		var self = this;
		var promise = new Promise(function(resolve, reject){
			var reader = new FileReader();
			reader.onload = (function(image){
			    return function(e){
		    		self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
		        	self._drawImage(e.target.result, type).then(function(){
		        		resolve('success');
		        	});
			    };
			})(file);
	    	reader.readAsDataURL(file);
	    });

	    return promise;
	},
	_drawImage: function(design, type){
		var self = this;
		var detail = this.root.detail.split(',');

		var promise = new Promise(function(resolve, reject){
			if(typeof type !== 'undefined'){
				var imageTwo = new Image();
				imageTwo.src = design;
				imageTwo.onload = function(){
					self.context.drawImage(imageTwo, detail[0], detail[1], self.canvas.width, self.canvas.height);
					resolve('success');
				}
			}else{
				var image = new Image();
				image.src = '/images/product/tshirt/root/'+self.root.folder+'/first.png';
				image.onload = function(){
					self.context.drawImage(image, 0, 0, self.canvas.width, self.canvas.height);

					var imageTwo = new Image();
					imageTwo.src = design;
					imageTwo.onload = function(){
						self.context.globalCompositeOperation="source-in";
						self.context.drawImage(imageTwo, detail[2], detail[3], detail[0], detail[1]);

						imageThree = new Image();
						imageThree.src = '/images/product/tshirt/root/'+self.root.folder+'/second.png';
						imageThree.onload = function(){
							self.context.globalCompositeOperation="multiply";
							self.context.drawImage(imageThree, 0, 0, self.canvas.width, self.canvas.height);

							imageFour = new Image();
							imageFour.src = '/images/product/tshirt/root/'+self.root.folder+'/final.jpg';
							imageFour.onload = function(){
								self.context.drawImage(imageFour, 0, 0, self.canvas.width, self.canvas.height);
								resolve('success');
							}
						}
					}
				}
			}
		});

		return promise;
	},
	saveImage: function(designName, size){
		var self = this;
		var promise = new Promise(function(resolve, reject){
			var image = new Image();
			image.src = self.canvas.toDataURL('image/jpeg', 1);
			var canvas = document.createElement('canvas'),
			ratio = self.canvas.width/size,
	        ctx = canvas.getContext('2d');

	    	// set its dimension to target size
	    	canvas.width = size;
	    	canvas.height = self.canvas.height/ratio;

	    	// draw source image into the off-screen canvas:
	    	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	    	image.src = canvas.toDataURL('image/jpeg', 0.9);
			$(self.refs['link_'+size]).attr('href', image.src);
			if(typeof self.root.folder !== 'undefined'){
				if(self.root.parent === '0')
					var download_link = designName+'_'+self.root.folder+'_'+size+'.jpeg';
				else
					var download_link = designName+'_'+self.root.parent+'_'+size+'_'+'sub'+'.jpeg';
				$(self.refs['link_'+size]).attr('download', download_link);
			}else{
				$(self.refs['link_'+size]).attr('download', designName+'_'+size+'.jpeg');
			}
			$(self.refs['link_'+size]).click(function(){
				this.click();
				resolve('success');
			}).click();
		});
		return promise;
	},
	render: function(){
		return(
			<div>
				<input type="file" ref="file"/>
				<input type="file" ref="reload"/>
				<a ref="link_560"></a>
				<a ref="link_350"></a>
				<a ref="link_120"></a>
				<canvas ref="canvas"/>
			</div>
		)
	}
});

module.exports = Main;