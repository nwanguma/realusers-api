import express from "express";
import {
  getBounties,
  updateBounties,
  deleteBounties,
  addBounties,
} from "../controllers/bounty";

const router = express.Router();

router.get("/", bounty);

export default router;
