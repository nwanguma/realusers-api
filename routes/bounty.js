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

const router = express.Router();

router
  .route("/")
  .get(getBounties)
  .post(createBounty)
  .patch(updateBounties)
  .delete(deleteBounties);

router.route("/:id").get(getBounty).patch(updateBounty).delete(deleteBounty);

export default router;
