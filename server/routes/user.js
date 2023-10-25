import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

// get all users
router.get('/', userController.list);

// get a single user by id
router.get('/:id', userController.listById);

// get a single user by username
router.get('/username/:username', userController.listByUsername);

// get all users by role
router.get('/role/:type', userController.listByRole);

// create one user
router.post('/', userController.create);

// update one user; id needed in body
router.put('/', userController.update);

//update one user by id
router.put('/:id', userController.updateById);

router.delete('/:id', userController.destroy);

export default router;