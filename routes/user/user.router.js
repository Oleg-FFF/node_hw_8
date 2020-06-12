const {Router} = require('express');
const userRouter = Router();

const {userController} = require('../../controllers')
const {checkUser, checkFilesValidity, checkUserPhotoNumber} = require('../../middlewares')
const {checkAccessToken} = require('../../middlewares')


userRouter.post('/',
    checkFilesValidity,
    checkUserPhotoNumber,
    checkUser,
    userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:name', userController.getUserByParams);

userRouter.delete('/:id', userController.deleteUser);

userRouter.put('/:name',
    checkUserPhotoNumber,
    checkFilesValidity,
    userController.updateUser)


module.exports = userRouter;
