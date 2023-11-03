import express from 'express';
import propertyController from '../controllers/property.js';

const router = express.Router();

router.get('/', propertyController.list);
router.get('/:id', propertyController.listById);
router.get('/type/:type', propertyController.listByType);
router.get('/type/:type/:id', propertyController.listByTypeId);

router.get('/user/:id', propertyController.listByUserId);

router.post('/', propertyController.create);

router.put('/', propertyController.update);

router.put('/:id', propertyController.updateById);

router.delete('/:id', propertyController.destroy);

// ?TODO add function for searching

export default router;