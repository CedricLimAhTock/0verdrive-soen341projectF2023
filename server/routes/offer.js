import express from 'express';
import offerController from '../controllers/offer.js';

const router = express.Router();

router.get('/', offerController.list);

router.get('/:id', offerController.listById);

router.post('/', offerController.create);

router.put('/', offerController.update);

router.put('/:id', offerController.updateById);

router.delete('/:id', offerController.destroy);

export default router;