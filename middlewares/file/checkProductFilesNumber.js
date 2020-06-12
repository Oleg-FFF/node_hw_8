const {ErrorHandler} = require('../../error');
const {responseStatusCodesEnum} = require('../../constants');

module.exports = (req, res, next) => {

    if (req.docs.length) {
        return next(new ErrorHandler('You can`t upload only one document', responseStatusCodesEnum.BAD_REQUEST));
    }

    if (req.photos.length > 1) {
        return next(new ErrorHandler('You can upload only one photo', responseStatusCodesEnum.BAD_REQUEST));
    }

    next();
}
