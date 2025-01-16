import express from 'express';
import UserController from '../controller/UserController.js';
import UserRepository from "../repository/UserRepository.js";

const userRouter = express.Router();

const userController = new UserController({ userRepository: new UserRepository() });
userRouter.get('/', userController.getUsers.bind(userController));
userRouter.post('/', userController.createUser.bind(userController));
userRouter.patch('/:userId', userController.updateUser.bind(userController));
userRouter.delete('/:userId', userController.deleteUser.bind(userController));

export default userRouter;