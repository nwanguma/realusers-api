import { Schema, model } from "mongoose";
import validator from "validator";

const bountySchema = Schema(
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

const Bounty = model("Bounty", bountySchema);

export default Bounty;
