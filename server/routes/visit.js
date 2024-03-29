import express from "express";
import visitController from "../controllers/visit.js";

const router = express.Router();

router.get("/", visitController.list);

router.get("/:id", visitController.listById);

router.get("/status/:status", visitController.listByStatus);

router.get("/property/:property_id", visitController.listByPropertyId);

router.get("/client/:client_id", visitController.listByClientId);
router.get("/broker/:broker_id", visitController.listByBrokerId);


router.post("/", visitController.create);

router.put("/", visitController.update);
router.put("/:id", visitController.updateById);

router.delete("/:id", visitController.destroy);

export default router;
