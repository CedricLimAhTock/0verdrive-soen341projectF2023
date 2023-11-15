import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import User_role from '../../models/user_role.js';
import Role from '../../models/role.js';
import Broker from '../../models/broker.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      attributes: ['id', 'username', 'password'],
      where: { username: username }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }

    const user_role = await User_role.findOne({
      attributes: ['id', 'active', 'user_id', 'role_id'],
            include: [
              {
                  model: User,
                  required: true,
                  attributes: []
              },
              {
                model: Role,
                required: true,
                attributes: ['type']
              }
            ]
    });

    let broker = await Broker.findOne({
        attributes: ['id', 'active', 'user_id', 'license_number', 'agency', 'email', 'phone'],
        where: {
          user_id: user.id
        }
      });
    let token = null;

    
  
    if (!broker) {
      token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user_role.role.type
      },
      process.env.JWT_SECRET
    );
    } else {
      token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user_role.role.type,
        broker_id: broker.id
      },
      process.env.JWT_SECRET
    );

    }
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
