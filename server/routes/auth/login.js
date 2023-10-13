import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import User_role from '../../models/user_role.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    //const [rows] = await pool.query('SELECT id, username, password_hash FROM user WHERE username = ?', [username]);
    const user = await User.findOne({ where: {username: username}});


    if (rows.length === 0) {
      return res.status(401).json({ 
        message: 'No user with this username' 
      });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ 
        message: 'Authentication failed' 
      });
    }

    // const [roleRows] = await pool.query(`
    //   SELECT r.type FROM role r
    //   INNER JOIN user_role ur ON r.id = ur.role_id
    //   WHERE ur.user_id = ?
    // `, [user.id]);

    const roles = await User_role.findAll({
      attributes: ['type'],
      include: ['role'],
      where: {user_id: user.id}
    });
    console.log(roles);

    //const roles = roleRows.map((row) => row.type);

    const token = jwt.sign({ 
        id: user.id, 
        username: user.username, 
        role: roles 
    }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
