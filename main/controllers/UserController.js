var knex = require('../../db/connect');
var constant = require('../config/constant');

module.exports = {
    getAdminUserFacebook: function(req, res){
        res.render('admin/user/facebook');
    },
    getAdminUser: function(req, res){
        res.render('admin/user');
    },
    getAdminUserJsonList: function(req, res){
        knex
        .select(knex.raw('users.*, COUNT(CASE WHEN comments.parent <= 0 THEN 1 END) AS cmt_count'))
        .from('users')
        .leftJoin('comments', 'comments.user_id', '=', 'users.id')
        .groupBy('users.id')
        .orderBy('cmt_count')
        .then(function(users){
            res.json({list: users});
        });
    },
    postAdminUserJsonAdd: function(req, res){
        var json = {
            name: req.body.name,
            avatar: req.body.avatar
        }

        knex('users')
        .insert(json)
        .then(function(inserted){
            res.json({status: 'ok'});
        });
    },
    postAdminUserJsonEdit: function(req, res){
        var json = {
            name: req.body.name,
            avatar: req.body.avatar
        }

        knex('users')
        .where('id', '=', req.body.id)
        .update(json)
        .then(function(updated){
            res.json({status: 'ok'});
        });
    },
    getAdminUserFacebookJsonList: function(req, res){
        knex('fusers')
        .select('*')
        .then(function(fusers){
           res.json({list: fusers}); 
        });
    }
}