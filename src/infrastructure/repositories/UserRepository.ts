import IUserRepository from "../../domain/repositories/IUserRepository";
import User from "../../domain/entities/User";
import UserModel from "../database/models/UserModel";

class UserRepository implements IUserRepository {
    async findById(userId: string): Promise<User | null> {
        const userDoc = await UserModel.findById(userId);
        if (!userDoc) return null;
        return new User(userDoc.id, userDoc.name, userDoc.email, userDoc.password);
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ email });
        if (!userDoc) return null;
        return new User(userDoc.id, userDoc.name, userDoc.email, userDoc.password);
    }

    async save(user: User): Promise<User> {
        const newUser = new UserModel(user);
        await newUser.save();
        return new User(newUser.id, newUser.name, newUser.email, newUser.password);
    }
}

export default UserRepository;
