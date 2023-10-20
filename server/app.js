import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { config } from 'dotenv';

import signUpRoutes from './routes/auth/signup.js';
import loginRoutes from './routes/auth/login.js';
import userRoutes from './routes/user.js';
import userRoleRoutes from './routes/user_role.js';
import roleRoutes from './routes/role.js';


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
app.use('/user', userRoutes);
app.use('/user_role', userRoleRoutes);
app.use('/role', roleRoutes);

export default app;