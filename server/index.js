import express from 'express';
import cors from 'cors';
import signUpRoutes from './routes/auth/signup.js';
import loginRoutes from './routes/auth/login.js';

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

app.use('/login', loginRoutes);
app.use('/signup', signUpRoutes);

//CONNECT THE DB HERE


const serverPort = process.env.PORT || 5173;
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});