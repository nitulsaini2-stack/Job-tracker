
import express from 'express';
import dotenv from 'dotenv';
import db from './db/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);
app.use("/api/applications", applicationRoutes);

app.get('/', (req, res) => {
    res.send('job tracker server is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});