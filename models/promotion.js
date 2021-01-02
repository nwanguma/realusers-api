import { Schema, model } from "mongoose";
import validator from "validator";

const promotionSchema = Schema(
  {
    company: String,
    expired: false,
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

const Promotion = model("Promotion", promotionSchema);

export default Promotion;
