import IUserRepository from "../../domain/repositories/IUserRepository";
import User from "../../domain/entities/User";

class UserUseCases {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async registerUser(name: string, email: string, password: string): Promise<User> {
        const user = new User(Date.now().toString(), name, email, password);
        await user.hashPassword();
        return await this.userRepository.save(user);
    }

    async loginUser(email: string, password: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        if(!user) {
            return false;
        }
        return user && await user.validatePassword(password);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}

export default UserUseCases;
