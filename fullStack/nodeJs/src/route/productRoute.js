const productController = require('../controller/productController')
const {upload} = require("../util/helper")
const product = (app) => {
  app.get('/api/product', productController.getAll);
  app.get('/api/product/:id', productController.getOne);
  app.get('/api/product-alert-stock', productController.getProductAlert);
  app.get('/api/pos_product', productController.getProduct);
  app.post('/api/product',upload.single("image_product"), productController.create);
  app.put('/api/product',upload.single("image_product") , productController.update);
  app.delete('/api/product', productController.remove);

}

module.exports= product