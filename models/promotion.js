import mongoose from "mongoose";
import lodash from "lodash";

const { pick } = lodash;
const { Schema, model } = mongoose;

const promotionSchema = Schema(
  {
    company: String,
    hideCompany: Boolean,
    expired: false,
    type: String,
    rewardType: String,
    immediate: Boolean,
    completed: false,
    userCategory: String,
    tags: [
      {
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

const Promotion = model("Promotion", promotionSchema);

promotionSchema.methods.toJSON = function () {
  const promotion = this;
  const promotionObject = promotion.toObject();

  const responseBody = pick(promotionObject, [
    "company",
    "submitted",
    "type",
    "rewardType",
    "immediate",
    "completed",
    "tags",
  ]);

  return responseBody;
};

export default Promotion;
