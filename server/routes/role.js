import express from 'express';
import roleController from '../controllers/role.js';

const router = express.Router();

router.get('/', roleController.list);

router.get('/:id', roleController.listById);

export default router;