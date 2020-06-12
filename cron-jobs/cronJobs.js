const {emailActionsEnum} = require('../constants');
const {userService, productService} = require('../services');
const {emailService} = require('../services');

module.exports = async () => {
    try{
        const prods = await productService.getProductsWithEmptyField('image');

        for (const prod of prods) {

            const id = prod.userId;
            const user = await userService.getUserById(id);
            const email = user.email;

            await emailService.sendMail(
                email,
                emailActionsEnum.REMINDER,
                {userName: user.name})

            console.log(email);
        }
    } catch (e) {
        console.log(e);
    }

}
