import express from "express";
import {
  getPromotions,
  createPromotion,
  updatePromotions,
  deletePromotions,
  getPromotion,
  updatePromotion,
  deletePromotion,
} from "../controllers/promotion";

const router = express.Router();

router
  .route("/")
  .get(getPromotions)
  .post(createPromotion)
  .patch(updatePromotions)
  .delete(deletePromotions);

router
  .route("/:id")
  .get(getPromotion)
  .patch(updatePromotion)
  .delete(deletePromotion);

export default router;
