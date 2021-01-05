import validator from "validator";
import pkg from "mongoose";
import lodash from "lodash";

const { pick } = lodash;

const { Schema, model } = pkg;

const BountySchema = new Schema(
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

BountySchema.methods.toJSON = function () {
  const bounty = this;
  const bountyObject = bounty.toObject();

  const body = pick(bountyObject, [
    "company",
    "submitted",
    "type",
    "rewardType",
    "immediate",
    "completed",
    "tags",
  ]);

  return body;
};

const Bounty = model("Bounty", BountySchema);

export default Bounty;
