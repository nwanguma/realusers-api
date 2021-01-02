import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = Schema(
  {
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
      unique: true,
      trim: true,
      validate: {
        validator: () => {
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
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
