const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {emailActionsEnum, responseStatusCodesEnum} = require('../../constants');
const {emailService, userService} = require('../../services');
const {productService} = require('../../services');
const {hashCouponCode, checkHashCouponCode} = require('../../helpers');
const {ErrorHandler, Errors} = require('../../error');

module.exports = {
    getAllProducts: async (req, res) => {
        const products = await productService.getAllProducts();

        res.json({products});
    },

    getProduct: async (req, res) => {
        const params = +req.params.id;

        const product = await productService.getProduct(params);

        res.json({product})
    },

    getDiscount: async (req, res, next) => {
        const productId = +req.params.id;
        const couponCode = req.body.coupon_code;
        const product = await productService.getProduct(productId);


        if (!product){
            return next(new ErrorHandler(Errors.NOT_FOUND.message, responseStatusCodesEnum.NOT_FOUND, Errors.NOT_FOUND.code))
        }

        const checkCoupon = await checkHashCouponCode(couponCode, product.coupon_code);

        if (!checkCoupon){
            return next(new ErrorHandler(Errors.NOT_VALID_COUPON.message, responseStatusCodesEnum.NOT_FOUND, Errors.NOT_VALID_COUPON.code))
        }

        res.end(`Your sale price is ${product.sale_price}`)
    },

    updateProduct: async (req, res) => {
        const prod = req.body;
        const params = +req.params.id;
        const userId = req.userId;
        const updProd = await productService.updateProduct(params, prod);
        const user = await userService.getUserById(userId);

        console.log(updProd);

        await emailService.sendMail(
            user.email,
            emailActionsEnum.PRODUCT_UPDATE,
            {
                userName: user.name,
                productType: prod.type,
                productBrand: prod.brand,
                productPrice: prod.price
            }
        )

        res.json({updProd})
    },

    deleteProduct: async (req, res) => {
        const params = +req.params.id;
        const userId = req.userId;
        const prod = await productService.getProduct(params);
        const user = await userService.getUserById(userId);
        const delProd = await productService.deleteProduct(params);

        await emailService.sendMail(
            user.email,
            emailActionsEnum.PRODUCT_DELETE,
            {
                userName: user.name,
                productType: prod.type,
                productBrand: prod.brand,
                productPrice: prod.price
            }
        )

        res.json({delProd})
    },

    createProduct: async (req, res) => {

        try {
            const product = req.body;
            const userId = req.userId;
            const [image] = req.photos;

            const hashedCouponCode = await hashCouponCode(product.coupon_code);

            product.coupon_code = hashedCouponCode;

            const fullProduct = {...product, userId};

            const newProd = await productService.createProduct(fullProduct);
            const id = newProd.id;
            const user = await userService.getUserById(userId);

            if (image) {
                const imageDir = `products/${id}/images`;
                const fileExtension = image.name.split('.').pop();
                const imageName = `${uuid}.${fileExtension}`
                console.log(imageName);

                await fs.mkdir(path.resolve(process.cwd(), 'public', imageDir), {recursive: true})
                await image.mv(path.resolve(process.cwd(), 'public', imageDir, imageName));
                await productService.updateProduct(id, {image: `/${imageDir}/${imageName}`})
            }

            await emailService.sendMail(
                user.email,
                emailActionsEnum.PRODUCT_CREATE,
                {
                    userName: user.name,
                    productId: newProd.id,
                    productType: newProd.type,
                    productBrand: newProd.brand,
                    productPrice: newProd.price
                }
            )
        } catch (e) {
            res.json(e)
        }
        res.end()
    }
};
