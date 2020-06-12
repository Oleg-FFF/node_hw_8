const db = require('../../dataBase').getInstance();
const {PRODUCT} = require('../../constants/modelNames.enum')

class ProductService {

    getAllProducts() {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({})
    }

    createProduct(product) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.create(product)
    }

    getProduct(productId) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findByPk(productId);
    }

    getProductsWithEmptyField(image) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({
            where: image = null,
            group: ['userId']
        })
    }

    updateProduct(productId, product) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.update(product, {
            where: {
                id: productId
            }
        });
    }

    deleteProduct(productId) {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.destroy({
            where: {
                id: productId
            }
        });
    }
}

module.exports = new ProductService;
