import express from 'express';
import userRoleController from '../controllers/user_role.js';

const router = express.Router();

router.get('/', userRoleController.list);

router.get('/:id', userRoleController.listById);

router.get('/user_id/:user_id', userRoleController.listByUserId);

router.get('/role_id/:role_id', userRoleController.listByRoleId);

router.post('/', userRoleController.create);

router.put('/', userRoleController.update);

router.put('/:id', userRoleController.updateById);

router.delete('/:id', userRoleController.destroy);

export default router;