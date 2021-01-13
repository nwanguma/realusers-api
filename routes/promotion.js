import express from "express";
import {
  getPromotions,
  createPromotion,
  updatePromotions,
  deletePromotions,
  getPromotion,
  updatePromotion,
  deletePromotion,
} from "../controllers/promotion.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, getPromotions)
  .post(authenticate, createPromotion)
  .patch(authenticate, updatePromotions)
  .delete(authenticate, deletePromotions);

router
  .route("/:id")
  .get(authenticate, getPromotion)
  .patch(authenticate, updatePromotion)
  .delete(authenticate, deletePromotion);

export default router;
