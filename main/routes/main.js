var MainController = require('../controllers/MainController');

module.exports = function(router){
    router.get('/', MainController.getHome);
    router.get('/ao-thun/:sex/:type/:seo', MainController.getDetail);
    router.get('/ao-thun/:seo', MainController.getTag);
    router.get('/ao-thun/:sex/:type', MainController.getType);
    router.get('/ho-tro/lien-he', MainController.getContact);
    router.get('/ho-tro/doi-tra', MainController.getReturn);
    router.get('/ho-tro/giao-hang', MainController.getShipping);

    router.post('/api/contact', MainController.postContact);
    router.post('/api/buy', MainController.postBuy);
}