import express from 'express';
import bcrypt from 'bcrypt';
//import mysql from 'mysql';

const router = express.Router();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lorem'
});

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const [row] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (row.length > 0) {
            return res.status(400).json({
                message: 'Username already taken'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({
            message: 'User created'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
});

export default router;