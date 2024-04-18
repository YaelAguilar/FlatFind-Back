import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserUseCases from '../../application/useCases/UserUseCases';
import UserRepository from '../repositories/UserRepository';

const userRouter = Router();
const userRepository = new UserRepository();
const userUseCases = new UserUseCases(userRepository);
const userController = new UserController(userUseCases);

userRouter.post('/register', (req, res) => userController.registerUser(req, res));
userRouter.post('/login', (req, res) => userController.loginUser(req, res));

export default userRouter;
