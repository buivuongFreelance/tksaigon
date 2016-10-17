var knex = require('../../db/connect');
var moment = require('moment');
var nodemailer = require('nodemailer');

module.exports = {
    postBuy: function(req, res){
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'buivuongdhmo@gmail.com', // Your email id
                pass: 'zaq!@wsx' // Your password
            }
        });

        var text = "Ten: "+req.body.form[0].value+"<br> SDT: "+req.body.form[1].value+"<br> Address: "+req.body.form[2].value
                +"<br>Child Size: "+req.body.child_size+"<br> Size: "+req.body.size+"<br> Quantity: "+req.body.quantity+"<br> Item: "+req.body.item_id
                +"<br>Image: "+req.body.image;

        var mailOptions = {
            from: 'tksaigonaothun@gmail.com', // sender address
            to: 'buivuongdhmo@gmail.com', // list of receivers
            subject: 'Mua hàng', // Subject line
            html: text //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };

        knex('customers')
        .insert({
            name: req.body.form[0].value,
            phone: req.body.form[1].value,
            address: req.body.form[2].value,
            child_size: 'no',
            size: req.body.size,
            quantity: req.body.quantity,
            item_id: req.body.item_id,
            image: req.body.image
        })
        .then(function(response){
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    
                };
            });
            res.json({status: 'ok'});
        })
    },
    postContact: function(req, res){
        knex('contacts')
        .insert({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        })
        .then(function(response){
            res.json({status: 'ok'});
        })
    },
    getContact: function(req, res){
        knex('tags')
        .then(function(tags){
            res.render('main/contact', {tags: tags});
        });
    },
    getTag: function(req, res){
        var params_page = 0;
        if(typeof req.query.page !== 'undefined')
            params_page = parseInt(req.query.page)-1;

        knex('designs')
        .select('designs.id', 'designs.name', 'items.design_id', 
            'items.product_id', 'items.price', 'items.image', 'designs.content', 'products.sex', 'designs.seo', 'products.type', 'designs.love')
        .join('items', 'items.design_id', 'designs.id')
        .join('products', 'products.id', 'items.product_id')
        .join('designs_tags', 'designs_tags.design_id', 'designs.id')
        .join('tags', 'tags.id', 'designs_tags.tag_id')
        .offset(params_page*21)
        .limit(21)
        .where({
            'tags.seo': req.params.seo,
            'items.selected': 1
        })
        .then(function(products){
            knex('designs')
            .count('designs.id as count')
            .join('items', 'items.design_id', 'designs.id')
            .join('products', 'products.id', 'items.product_id')
            .join('designs_tags', 'designs_tags.design_id', 'designs.id')
            .join('tags', 'tags.id', 'designs_tags.tag_id')
            .where({
                'tags.seo': req.params.seo,
                'items.selected': 1
            })
            .then(function(co){
                var count = co[0].count;
                var pages = Math.ceil(count/products.length);
                var pages_arr = [];
                var current_page = 1;

                if(typeof req.query.page !== 'undefined')
                    current_page = parseInt(req.query.page);
                for(var i = 0; i < pages; i++){
                    var page = i+1;
                    if(page === current_page)
                        pages_arr.push({number: page, class: 'scheme_color'});
                    else
                        pages_arr.push({number: page, class: 'color_dark'});
                }

                knex('tags')
                .then(function(tags){
                    knex('tags')
                    .where({
                        'tags.seo': req.params.seo
                    })
                    .then(function(tag){
                        var t = tag[0];
                        res.render('main/tag', {tags: tags, tag: t, products: products, count: count, pages_arr: pages_arr});
                    })
                });
            })
        })
    },
    getType: function(req, res){
        var params_page = parseInt(req.query.page)-1;

        knex('designs')
        .select('designs.id', 'designs.name', 'items.design_id', 
            'items.product_id', 'items.price', 'items.image', 'designs.content', 'products.sex', 'designs.seo', 'products.type', 'designs.love')
        .join('items', 'items.design_id', 'designs.id')
        .join('products', 'products.id', 'items.product_id')
        .offset(params_page*21)
        .limit(21)
        .where({
            'products.sex': req.params.sex,
            'products.type': req.params.type
        })
        .then(function(products){
            var sex_value = '';
            var type_value = '';
            var menus = [];
            if(req.params.sex === 'nam'){
                sex_value = 'Áo Thun Nam';
                menus.push({name: 'Áo Thun Nam Vai Đen', type: 'vai-den', sex: 'nam', image: 'vai-den-nam-icon.png'});
                menus.push({name: 'Áo Thun Nam Vai Trắng', type: 'vai-trang', sex: 'nam', image: 'vai-trang-nam-icon.png'});
                menus.push({name: 'Áo Thun Nam Raglan', type: 'raglan', sex: 'nam', image: 'raglan-nam-icon.png'});
                menus.push({name: 'Áo Thun Nam Ba Lỗ', type: 'ba-lo', sex: 'nam', image: 'ba-lo-icon.png'});
            }
            else if(req.params.sex === 'nu'){
                sex_value = 'Áo Thun Nữ';
                menus.push({name: 'Áo Thun Nữ Vai Đen', type: 'vai-den', sex: 'nu', image: 'vai-den-nu-icon.png'});
                menus.push({name: 'Áo Thun Nữ Vai Trắng', type: 'vai-trang', sex: 'nu', image: 'vai-trang-nu-icon.png'});
                menus.push({name: 'Áo Thun Nữ Raglan', type: 'raglan', sex: 'nu', image: 'raglan-nam-icon.png'});
                menus.push({name: 'Áo Thun Nữ Ba Lỗ', type: 'ba-lo', sex: 'nu', image: 'ba-lo-icon.png'});
            }
            else{
                sex_value = 'Áo Thun Trẻ Em';
                menus.push({name: 'Áo Thun Trẻ Em Vai Trắng', type: 'vai-trang', sex: 'tre-em', image: 'vai-trang-nam-icon.png'});
                menus.push({name: 'Áo Thun Trẻ Em Ba Lỗ', type: 'ba-lo', sex: 'tre-em', image: 'ba-lo-icon.png'});
            }

            if(req.params.type === 'ba-lo')
                type_value = 'Áo Thun Ba Lỗ';
            else if(req.params.type === 'raglan')
                type_value = 'Áo Thun Raglan';
            else if(req.params.type === 'vai-den')
                type_value = 'Áo Thun Vai Đen';
            else if(req.params.type === 'vai-trang')
                type_value = 'Áo Thun Vai Trắng';

            knex('designs')
            .count('designs.id as count')
            .join('items', 'items.design_id', 'designs.id')
            .join('products', 'products.id', 'items.product_id')
            .where({
                'products.sex': req.params.sex,
                'products.type': req.params.type
            })
            .then(function(co){
                var count = co[0].count;
                var pages = Math.ceil(count/products.length);
                var pages_arr = [];
                var current_page = 1;

                if(typeof req.query.page !== 'undefined')
                    current_page = parseInt(req.query.page);
                for(var i = 0; i < pages; i++){
                    var page = i+1;
                    if(page === current_page)
                        pages_arr.push({number: page, class: 'scheme_color'});
                    else
                        pages_arr.push({number: page, class: 'color_dark'});
                }

                knex('tags')
                .then(function(tags){
                    res.render('main/type', {tags: tags, products: products, sex: req.params.sex, type: req.params.type, sex_value: sex_value, type_value: type_value, menus: menus, count: count, pages_arr: pages_arr});
                });
            })
        });
    },
    getDetail: function(req, res){
        knex('designs')
        .select('designs.id', 'designs.name', 'items.design_id', "items.id as item_id",
            'items.product_id', 'items.price', 'items.image', 'products.name as product_name', 'designs.content', 'products.sex', 'designs.seo', 'products.type', 'designs.love')
        .join('items', 'items.design_id', 'designs.id')
        .join('products', 'products.id', 'items.product_id')
        .where({
            'products.sex': req.params.sex,
            'products.type': req.params.type,
            'designs.seo': req.params.seo
        })
        .then(function(product){
            var pro = product[0];
            if(pro.sex === 'nam')
                pro.sex_value = 'Áo Thun Nam';
            else if(pro.sex === 'nu')
                pro.sex_value = 'Áo Thun Nữ';
            else
                pro.sex_value = 'Áo Thun Trẻ Em';

            if(pro.type === 'ba-lo')
                pro.type_value = 'Áo Thun Ba Lỗ';
            else if(pro.type === 'raglan')
                pro.type_value = 'Áo Thun Raglan';
            else if(pro.type === 'vai-den')
                pro.type_value = 'Áo Thun Vai Đen';
            else if(pro.type === 'vai-trang')
                pro.type_value = 'Áo Thun Vai TRắng';

            pro.design_image = pro.image.split('_')[0];

            knex('designs')
            .select('designs.id', 'designs.name', 'items.design_id', 
                'items.product_id', 'items.price', 'items.image', 'designs.content', 'products.sex', 'designs.seo', 'products.type', 'designs.love', 'products.name as product_name')
            .join('items', 'items.design_id', 'designs.id')
            .join('products', 'products.id', 'items.product_id')
            .where({
                'items.design_id': pro.design_id
            })
            .then(function(product_rels){
                knex('tags')
                .then(function(tags){
                    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                    res.render('main/detail', {product: pro, product_rels: product_rels, tags: tags, url: fullUrl});
                });
            });
        })
    },
    getHome: function(req, res){
    	knex('designs')
    	.select('designs.id', 'designs.name', 'items.product_id', 'items.design_id', 'items.price', 'items.id as item_id', 'items.image', 'products.sex', 'products.type', 'designs.seo')
    	.join('items', 'items.design_id', 'designs.id')
        .join('products', 'products.id', 'items.product_id')
    	.orderBy('designs.created_at', 'desc')
    	.where({
    		'items.selected': 1
    	})
        .limit(8)
    	.then(function(news){
            knex('designs')
            .select('designs.id', 'designs.name', 'designs.love', 'items.product_id', 'items.design_id', 'items.price', 'items.id as item_id', 'items.image', 'products.sex', 'products.type', 'designs.seo')
            .join('items', 'items.design_id', 'designs.id')
            .join('products', 'products.id', 'items.product_id')
            .orderBy('designs.love', 'desc')
            .where({
                'items.selected': 1
            })
            .limit(8)
            .then(function(loves){
                knex('designs')
                .select('designs.id', 'designs.name', 'designs.views', 'items.product_id', 'items.design_id', 'items.price', 'items.id as item_id', 'items.image', 'products.sex', 'products.type', 'designs.seo')
                .join('items', 'items.design_id', 'designs.id')
                .join('products', 'products.id', 'items.product_id')
                .orderBy('designs.views', 'desc')
                .where({
                    'items.selected': 1
                })
                .limit(8)
                .then(function(views){
                    res.render('main/home', {news: news, loves: loves, views: views});
                });
            });
    	});
    },
    getReturn: function(req, res){
        knex('tags')
        .then(function(tags){
            res.render('main/return', {tags: tags});
        });
    },
    getShipping: function(req, res){
        knex('tags')
        .then(function(tags){
            res.render('main/shipping', {tags: tags});
        });
    }

}