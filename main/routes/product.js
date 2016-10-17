var ProductController = require('../controllers/ProductController');

module.exports = function(router){
    router.get('/admin/product', ProductController.getAdminProduct);
    router.get('/admin/product/json/list', ProductController.getAdminProductJsonList);
    router.post('/admin/product/json/add', ProductController.postAdminProductJsonAdd);
    router.post('/admin/product/json/edit', ProductController.postAdminProductJsonEdit);
    router.post('/admin/product/json/editImages', ProductController.postAdminProductJsonEditImages);

    router.post('/admin/product/comment/user/select', ProductController.postAdminProductCommentUserSelect);
    router.post('/admin/product/comment/list', ProductController.postAdminProductCommentList);
    router.post('/admin/product/comment/user/update', ProductController.postAdminProductCommentUpdate);

    router.get('/admin/product/canvas', ProductController.getAdminProductCanvas);
    router.get('/admin/product/root/list', ProductController.getAdminProductRootList);
}