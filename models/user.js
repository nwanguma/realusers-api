import validator from "validator";
import pkg from "mongoose";
import jwt, { decode } from "jsonwebtoken";
import lodash from "lodash";
import bcrypt from "bcryptjs";

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

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({ email }).then((user) => {
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

  const body = pick(userObject, [
    "firstname",
    "lastname",
    "email",
    "bio",
    "age",
  ]);

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
    const savedUser = user.save();

    if (savedUser) return token;
  } catch (e) {
    throw new Error();
  }
};

const User = model("User", UserSchema);

export default User;
