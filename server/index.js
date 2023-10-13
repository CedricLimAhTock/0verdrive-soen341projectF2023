import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import signUpRoutes from './routes/auth/signup.js';
import loginRoutes from './routes/auth/login.js';
import { config } from 'dotenv';

console.log(config());

const app = express(); 

app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use('/signin', loginRoutes);
app.use('/signup', signUpRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});

const serverPort = process.env.PORT;
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});