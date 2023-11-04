import express from 'express';
import brokerSearchController from '../controllers/brokerSearch.js';

const router = express.Router();

router.post('/', brokerSearchController.query);


export default router;