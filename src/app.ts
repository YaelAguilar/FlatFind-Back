import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './infrastructure/routes/userRoutes';
import connectDB from './infrastructure/database/mongooseDatabase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();
