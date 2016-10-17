var TagController = require('../controllers/TagController');

module.exports = function(router){
    router.get('/admin/tag', TagController.getAdminTag);

    router.post('/admin/tag/json/add', TagController.postAdminTagJsonAdd);
    router.post('/admin/tag/json/edit', TagController.postAdminTagJsonEdit);
    router.get('/admin/tag/json/list', TagController.getAdminTagJsonList);
}