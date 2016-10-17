var UserController = require('../controllers/UserController');

module.exports = function(router){
    router.get('/admin/user', UserController.getAdminUser);
    router.get('/admin/user/json/list', UserController.getAdminUserJsonList);
    router.post('/admin/user/json/add', UserController.postAdminUserJsonAdd);
    router.post('/admin/user/json/edit', UserController.postAdminUserJsonEdit);

    router.get('/admin/user/facebook', UserController.getAdminUserFacebook);
    router.get('/admin/user/facebook/json/list', UserController.getAdminUserFacebookJsonList);
}