const {Router} = require('express');

const productRouter = Router();

const {productController} = require('../../controllers');
const {checkProduct, checkAccessToken, checkFilesValidity, checkProductFiles} = require('../../middlewares');


productRouter.post('/',
    checkProduct,
    checkAccessToken,
    checkFilesValidity,
    checkProductFiles,
    productController.createProduct);

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.post('/sale/:id', productController.getDiscount);

productRouter.put('/:id',
    checkProduct,
    checkAccessToken,
    checkFilesValidity,
    checkProductFiles,
    productController.updateProduct);

productRouter.delete('/:id',
    checkAccessToken,
    productController.deleteProduct);


module.exports = productRouter;
