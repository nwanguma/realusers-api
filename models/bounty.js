import validator from "validator";
import pkg from "mongoose";

const { Schema, model } = pkg;

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
