const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name',
});

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await pool.query('SELECT id, username, password_hash FROM user WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ 
        message: 'No user with this username' 
      });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ 
        message: 'Authentication failed' 
      });
    }

    const [roleRows] = await pool.query(`
      SELECT r.type FROM role r
      INNER JOIN user_role ur ON r.id = ur.role_id
      WHERE ur.user_id = ?
    `, [user.id]);

    const roles = roleRows.map((row) => row.type);

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

module.exports = router;
