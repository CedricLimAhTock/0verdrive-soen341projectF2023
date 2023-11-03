import express from "express";
import property_favouriteController from '../controllers/property_favourite.js';

const router = express.Router();

router.get('/', property_favouriteController.list);

router.get('/:id', property_favouriteController.listById);

router.get('/property/:property_id', property_favouriteController.listByPropertyId);

//create and delete need to be added

export default router;