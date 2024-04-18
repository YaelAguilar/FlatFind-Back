import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI as string;
        await mongoose.connect(dbUri);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
};

export default connectDB;
