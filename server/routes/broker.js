import express from 'express';
import brokerController from '../controllers/broker.js';

const router = express.Router();

router.get('/', brokerController.list);

router.get('/:id', brokerController.listById);
router.get('/user/:id', brokerController.listByUserId);
router.get('/username/:username', brokerController.listByUsername);
router.get('/property/:id', brokerController.listByPropertyId);

router.post('/', brokerController.create);

router.put('/', brokerController.update);

router.put('/:id', brokerController.updateById);

router.delete('/:id', brokerController.destroy);

export default router;