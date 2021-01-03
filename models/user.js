import validator from "validator";
import pkg from "mongoose";
import jwt from "jsonwebtoken";
import lodash from "lodash";

const { Schema, model } = pkg;
const { pick } = lodash;

const UserSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Email is invalid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
      validate: {
        validator: (value) => {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          });
        },
        message: "Password is weak, please choose a stronger password",
      },
    },
    age: String,
    bio: String,
    tokens: [
      {
        access: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return pick(userObject, ["firstname", "lastname", "email", "age", "bio"]);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "secretsalt")
    .toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

const User = model("User", UserSchema);

export default User;
