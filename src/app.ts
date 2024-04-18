import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './infrastructure/routes/userRoutes';
import connectDB from './infrastructure/database/mongooseDatabase';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();
