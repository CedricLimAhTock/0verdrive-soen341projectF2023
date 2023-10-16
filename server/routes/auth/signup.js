import express from 'express';
import bcrypt from 'bcrypt';
import User from "../../models/user.js";
import User_role from "../../models/user_role.js"

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        //const [row] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
        const user = await User.findOne({ where: {username: username}});

        if (user) {
            return res.status(400).json({
                message: 'Username already taken'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        //await pool.query('INSERT INTO user (id, active, username, password) VALUES (NULL, 1, ?, ?)', [username, hashedPassword]);
        const newuser = await User.create({
            active: 1,
            username: username,
            password_hash: hashedPassword
        });
        console.log(newuser);

        // each new user must have a role associated
        await User_role.create({
            active: 1,
            user_id: newuser.id,
            role_id: 1
        }).then(res => {
            console.log(res)
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });

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