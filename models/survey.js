import { Schema, model } from "mongoose";
import validator from "validator";

const surveySchema = Schema(
  {
    company: String,
    submitted: false,
    type: String,
    rewardType: String,
    immediate: Boolean,
    completed: false,
    tags: [
      {
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

const Survey = model("Survey", surveySchema);

export default Survey;
