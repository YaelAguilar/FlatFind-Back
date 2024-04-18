import express from 'express';
//import userRoutes from './infrastructure/routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
//app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});