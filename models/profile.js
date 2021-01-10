import mongoose from "mongoose";
import lodash from "lodash";

const { Schema, model } = mongoose;
const { pick } = lodash;

const ProfileSchema = new Schema(
  {
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    age: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

ProfileSchema.methods.toJSON = function () {
  const profile = this;
  const profileObject = profile.toObject();

  const body = pick(profileObject, [
    "firstname",
    "lastname",
    "occupation",
    "age",
    "bio",
  ]);

  return body;
};

const Profile = model("Profile", ProfileSchema);

export default Profile;
