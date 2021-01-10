import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
} from "../controllers/profile.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, getProfile)
  .post(authenticate, createProfile)
  .patch(authenticate, updateProfile);

export default router;
