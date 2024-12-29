import express from 'express';
import UserController from '../controller/UserController.js';

const userRouter = express.Router();

const userController = new UserController();
userRouter.get('/', userController.getUsers.bind(userController));
userRouter.post('/', userController.createUser.bind(userController));

export default userRouter;