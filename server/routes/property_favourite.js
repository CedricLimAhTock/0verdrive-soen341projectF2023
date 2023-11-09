import express from "express";
import property_favouriteController from "../controllers/property_favourite.js";

const router = express.Router();

router.get("/", property_favouriteController.list);

router.get("/:id", property_favouriteController.listById);

router.get("/user/:id", property_favouriteController.listByUserId);

router.get("/property/:id", property_favouriteController.listByPropertyId);
router.get(
  "/user/:user_id/property/:property_id",
  property_favouriteController.listByUserPropertyId
);

router.post("/", property_favouriteController.create);

router.delete("/", property_favouriteController.destroy);
router.delete(
  "/user/:user_id/property/:property_id",
  property_favouriteController.destroyByUserPropertyId
);

export default router;
