import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.get('/', userController.list);

router.get('/:id', userController.listById);

router.get('/username/:username', userController.listByUsername);

router.post('/', userController.create);

router.put('/', userController.update);

router.put('/:id', userController.updateById);

router.delete('/:id', userController.destroy);

export default router;