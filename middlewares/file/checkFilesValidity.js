const {ErrorHandler} = require('../../error');
const {filesLoadingEnum, responseStatusCodesEnum} = require('../../constants');

module.exports = (req, res, next) => {
    req.photos = [];
    req.docs = [];

    if (!req.files) {
        return next();
    }

    const files = Object.values(req.files);

    for (const file  of files) {
        const {size, mimetype, name} = file

        if (filesLoadingEnum.PHOTO_MIMETYPES.includes(mimetype)) {

            if (size > filesLoadingEnum.MAX_PHOTO_SIZE) {
                return next(
                    new ErrorHandler(`Max file size is ${filesLoadingEnum.MAX_PHOTO_SIZE}`, responseStatusCodesEnum.BAD_REQUEST)
                )
            }

            req.photos.push(file)
        }

        else if (filesLoadingEnum.DOC_MIMETYPES.includes(mimetype)) {
            if (size > filesLoadingEnum.MAX_DOC_SIZE) {
                return next(
                    new ErrorHandler(`Max file size is ${filesLoadingEnum.MAX_DOC_SIZE}`, responseStatusCodesEnum.BAD_REQUEST)
                )
            }

            req.docs.push(file)
        }

        else {
            next(new ErrorHandler(`File ${name} is not valid`, responseStatusCodesEnum.BAD_REQUEST))
        }
    }

    next();
}
