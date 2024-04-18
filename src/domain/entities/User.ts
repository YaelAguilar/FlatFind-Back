import bcrypt from 'bcryptjs';

class User {
    id: string;
    name: string;
    email: string;
    password: string;

    constructor(id: string, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async validatePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}

export default User;
