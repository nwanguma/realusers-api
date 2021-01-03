import express from "express";
import {
  getSurveys,
  createSurvey,
  updateSurveys,
  deleteSurveys,
  getSurvey,
  updateSurvey,
  deleteSurvey,
} from "../controllers/survey";

const router = express.Router();

router
  .route("/")
  .get(getSurveys)
  .post(createSurvey)
  .patch(updateSurveys)
  .delete(deleteSurveys);

router.route("/:id").get(getSurvey).patch(updateSurvey).delete(deleteSurvey);

export default router;
