import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserUseCases from '../../application/useCases/UserUseCases';

class UserController {
    private userUseCases: UserUseCases;

    constructor(userUseCases: UserUseCases) {
        this.userUseCases = userUseCases;
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const user = await this.userUseCases.registerUser(name, email, password);
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unexpected error occurred" });
            }
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.userUseCases.getUserByEmail(email);
            if (!user || !(await user.validatePassword(password))) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true });
            res.json({ message: "User logged in successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unexpected error occurred" });
            }
        }
    }
}

export default UserController;
