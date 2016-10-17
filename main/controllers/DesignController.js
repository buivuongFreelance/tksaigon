var knex = require('../../db/connect');
var moment = require('moment');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'themes/images/items/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({storage: storage}).array('items',100);

module.exports = {
    postAdminDesignJsonListSubItems: function(req, res){
        knex
        .from('sub_items')
        .where('item_id', req.body.item_id)
        .orderBy('id', 'desc')
        .then(function(sub_items){
            res.json({list: sub_items});
        });
    },
    postAdminDesignJsonAddSubItems: function(req, res){
        knex.transaction(function(tr) {
            return knex.batchInsert('sub_items', req.body.rows, 1000)
            .transacting(tr)
        })
        .then(function(){
            res.json({status: 'ok'});
        })
        .catch(function(){
            res.status(401).json({status: 'error'});
        });
    },
    postAdminDesignJsonSelectItem: function(req, res){
        knex.transaction(function(tr) {
            return knex('items').where('design_id', req.body.design_id)
            .update({selected: 0}).transacting(tr)
            .then(function(){
                return knex('items')
                .where('id', req.body.id)
                .update({
                    selected: 1
                })
                .transacting(tr)
            })
        })
        .then(function(){
            res.json({status: 'ok'});
        })
        .catch(function(){
            res.status(401).json({status: 'error'});
        });
    },
    postAdminDesignJsonListItems: function(req, res){
        knex
        .select('items.id', 'items.product_id', 'items.design_id', 'items.price', 'items.selected', 'products.name')
        .from('items')
        .innerJoin('products', 'products.id', 'items.product_id')
        .where('design_id', req.body.design_id)
        .then(function(designs){
            res.json({list: designs});
        });
    },
    postAdminDesignJsonAddItems: function(req, res){
        knex.transaction(function(tr) {
            return knex.batchInsert('items', req.body.rows, 1000)
            .transacting(tr)
        })
        .then(function(){
            res.json({status: 'ok'});
        })
        .catch(function(){
            res.status(401).json({status: 'error'});
        });
    },
    postAdminDesignJsonUploadItems: function(req, res){
        upload(req,res,function(err){
            if(err){
                console.log(err);
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    },
    postAdminDesignJsonListTags: function(req, res){
        knex('designs_tags')
        .select('designs_tags.id', 'tags.name', 'tags.code')
        .innerJoin('tags', 'tags.id', 'designs_tags.tag_id')
        .where('design_id', req.body.design_id)
        .then(function(designs_tags){
            res.json({list: designs_tags});
        })
    },
    postAdminDesignJsonAddTags: function(req, res){
        knex.transaction(function(tr) {
            return knex('designs_tags').where('design_id', req.body.design_id)
            .del().transacting(tr)
            .then(function(){
                return knex.batchInsert('designs_tags', req.body.rows, 1000)
                .transacting(tr)
            })
        })
        .then(function(){
            res.json({status: 'ok'});
        })
        .catch(function(){
            res.status(401).json({status: 'error'});
        });
    },
	getAdminDesign: function(req, res){
		res.render('admin/design');
	},
	postAdminDesignJsonAdd: function(req, res){
		var json = {
            name: req.body.name,
            love: req.body.love,
            views: req.body.views,
            content: req.body.content,
            seo: req.body.seo
        }

        knex('designs')
        .insert(json)
        .then(function(inserted){
            res.json({status: 'ok'});
        });
	},
	postAdminDesignJsonEdit: function(req, res){
		var json = {
            name: req.body.name,
            love: req.body.love,
            views: req.body.views,
            content: req.body.content,
            seo: req.body.seo
        }

        knex('designs')
        .where('id', '=', req.body.id)
        .update(json)
        .then(function(updated){
            res.json({status: 'ok'});
        });
	},
	getAdminDesignJsonList: function(req, res){
		knex
        .from('designs')
        .orderBy('created_at', 'desc')
        .then(function(designs){
            res.json({list: designs});
        });
	}
}