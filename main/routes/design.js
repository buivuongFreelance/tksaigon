var DesignController = require('../controllers/DesignController');

module.exports = function(router){
    router.get('/admin/design', DesignController.getAdminDesign);

    router.post('/admin/design/json/add', DesignController.postAdminDesignJsonAdd);
    router.post('/admin/design/json/edit', DesignController.postAdminDesignJsonEdit);
    router.get('/admin/design/json/list', DesignController.getAdminDesignJsonList);

    router.post('/admin/design/json/addTags', DesignController.postAdminDesignJsonAddTags);
    router.post('/admin/design/json/listTags', DesignController.postAdminDesignJsonListTags);
    router.post('/admin/design/json/uploadItems', DesignController.postAdminDesignJsonUploadItems);

    router.post('/admin/design/json/addItems', DesignController.postAdminDesignJsonAddItems);
    router.post('/admin/design/json/listItems', DesignController.postAdminDesignJsonListItems);
    router.post('/admin/design/json/selectItem', DesignController.postAdminDesignJsonSelectItem);

    router.post('/admin/design/json/addSubItems', DesignController.postAdminDesignJsonAddSubItems);
    router.post('/admin/design/json/listSubItems', DesignController.postAdminDesignJsonListSubItems);
}