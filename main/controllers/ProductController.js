var knex = require('../../db/connect');
var constant = require('../config/constant');

module.exports = {
    getAdminProductRootList: function(req, res){
        knex.select('*')
        .from('roots')
        .then(function(roots){
            res.json({list: roots});
        });
    },
    getAdminProduct: function(req, res){
        res.render('admin/product');
    },
    getAdminProductCanvas: function(req, res){
        res.render('admin/product/canvas');  
    },
    getAdminProductJsonList: function(req, res){
        knex.select('*')
        .from('products')
        .orderBy('id', 'desc')
        .then(function(products){
            res.json({list: products});
        });
    },
    postAdminProductJsonAdd: function(req, res){
        var json = {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            description: req.body.description,
            content: req.body.content,
            love: req.body.love,
            views: req.body.views
        }

        knex('products')
        .insert(json)
        .then(function(inserted){
            res.json({status: 'ok'});
        });
    },
    postAdminProductJsonEdit: function(req, res){
        var json = {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            description: req.body.description,
            content: req.body.content,
            love: req.body.love,
            views: req.body.views
        }

        knex('products')
        .where('id', '=', req.body.id)
        .update(json)
        .then(function(updated){
            res.json({status: 'ok'});
        });
    },
    postAdminProductJsonEditImages: function(req, res){
        var json = {
            images: req.body.images
        }

        knex('products')
        .where('id', '=', req.body.id)
        .update(json)
        .then(function(updated){
            res.json({status: 'ok'});
        });
    },
    postAdminProductCommentUserSelect: function(req, res){
        var json = {
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            parent: req.body.parent
        }

        knex('comments')
        .insert(json)
        .then(function(inserted){
            res.json({status: 'ok'});
        });
    },
    postAdminProductCommentList: function(req, res){
        var product_id = req.body.product_id;

        knex('comments')
        .select(knex.raw('comments.*, users.name, users.avatar'))
        .where('product_id', '=', product_id)
        .andWhere('comments.parent', '=', '0')
        .join('users', 'users.id', '=', 'comments.user_id')
        .then(function(parent){
            knex('comments')
            .select(knex.raw('comments.*, users.name, users.avatar'))
            .where('product_id', '=', product_id)
            .andWhere('comments.parent', '>', '0')
            .join('users', 'users.id', '=', 'comments.user_id')
            .then(function(children){
                children.map(function(c){
                    for(var i = 0; i < parent.length; i++){
                        if(c.parent === parent[i].id){
                            if(typeof parent[i].list === 'undefined')
                                parent[i].list = [];
                            parent[i].list.push(c);
                            break;
                        }
                    }
                })
                res.json({list: parent});
            })
        })
    },
    postAdminProductCommentUpdate: function(req, res){
        var comment_id = req.body.comment_id;
        var content = req.body.content;

        knex('comments')
        .where('id', '=', comment_id)
        .update({content: content})
        .then(function(updated){
            res.json({status: 'ok'});
        })
    }
}