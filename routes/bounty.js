import express from "express";
import {
  getBounties,
  createBounty,
  updateBounties,
  deleteBounties,
  getBounty,
  updateBounty,
  deleteBounty,
} from "../controllers/bounty.js";

import authenticate from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, getBounties)
  .post(authenticate, createBounty)
  .patch(authenticate, updateBounties)
  .delete(authenticate, deleteBounties);

router
  .route("/:id")
  .get(authenticate, getBounty)
  .patch(authenticate, updateBounty)
  .delete(authenticate, deleteBounty);

export default router;
