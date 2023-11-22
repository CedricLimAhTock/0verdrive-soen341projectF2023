import express from "express";
import listingController from "../controllers/listing.js";

const router = express.Router();

router.get("/", listingController.list);

router.get("/:id", listingController.listById);

router.get("/broker/:id", listingController.listByBrokerId);

router.get("/property/:id", listingController.listByPropertyId);

router.post("/", listingController.create);
router.post("/property", listingController.createWithProperty);


router.put("/", listingController.update);

router.put("/:id", listingController.updateById);

router.delete("/:id", listingController.destroy);

export default router;