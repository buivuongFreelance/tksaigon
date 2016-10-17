var knex = require('../../db/connect');
var moment = require('moment');

module.exports = {
	getAdminTag: function(req, res){
		res.render('admin/tag');
	},
	postAdminTagJsonAdd: function(req, res){
		var json = {
            name: req.body.name,
            code: req.body.code
        }

        knex('tags')
        .insert(json)
        .then(function(inserted){
            res.json({status: 'ok'});
        });
	},
	postAdminTagJsonEdit: function(req, res){
		var json = {
            name: req.body.name,
            code: req.body.code
        }

        knex('tags')
        .where('id', '=', req.body.id)
        .update(json)
        .then(function(updated){
            res.json({status: 'ok'});
        });
	},
	getAdminTagJsonList: function(req, res){
		knex
        .from('tags')
        .then(function(tags){
            res.json({list: tags});
        });
	}
}