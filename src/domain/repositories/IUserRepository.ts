import User from "../entities/User";

interface IUserRepository {
    findById(userId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
}

export default IUserRepository;
