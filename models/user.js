import validator from "validator";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import lodash from "lodash";
import bcrypt from "bcryptjs";

const { Schema, model, Types } = mongoose;
const { pick } = lodash;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      unique: true,
    },
    email: {
      type: String,
      required: true,
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
          });
        },
        message: "password is weak",
      },
    },
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

UserSchema.statics.findByCredentials = function (email, username, password) {
  const User = this;

  return User.findOne({ $or: [{ email }, { username }] }).then((user) => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res) {
          reject();
        } else {
          resolve(user);
        }
      });
    });
  });
};

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  const body = pick(userObject, ["email", "_id", "username"]);

  return body;
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "thisismysecret");
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth",
  });
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const access = "auth";

  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, "thisismysecret")
    .toString();

  user.tokens.push({ access, token });

  try {
    const savedUser = await user.save();

    if (savedUser) return token;
  } catch (e) {
    throw new Error();
  }
};

const User = model("User", UserSchema);

export default User;
