import express from 'express';
import messageController from '../controllers/message.js';

const router = express.Router();

router.get('/', messageController.list);

router.get('/:id', messageController.listById);

router.get('/sent/:id', messageController.listSentByUserId);

router.get('/received/:id', messageController.listReceivedByUserId);

router.post('/', messageController.create);

router.put('/', messageController.update);

router.put('/:id', messageController.updateById);

router.delete('/:id', messageController.destroy);

export default router;