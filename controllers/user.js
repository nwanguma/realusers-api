import User from "../models/user.js";
import lodash from "lodash";
import bcrypt from "bcryptjs";

const { pick } = lodash;

//@desc list all users
//@route /api/v1/user
//@method GET
//@access private
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users)
      return res.status({
        success: true,
        data: [],
      });

    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc create user
//@route /api/v1/user
//@method POST
//@access private
export const createUser = async (req, res, next) => {
  const body = pick(req.body, [
    "firstname",
    "lastname",
    "email",
    "password",
    "age",
    "bio",
  ]);
  const newUser = new User(body);

  try {
    const user = await newUser.save();

    const token = await newUser.generateAuthToken();

    if (!token) throw new Error();

    res.header("Authorization", token).status(201).send({
      success: true,
      message: "user created successfully",
      data: newUser,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc login
//@route /api/v1/user/login
//@method POST
//@access private
export const loginUser = (req, res, next) => {
  const body = pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password)
    .then(async (user) => {
      try {
        const token = await user.generateAuthToken();

        res.header("Authorization", token).send({
          success: true,
          data: {
            user,
            token,
          },
        });
      } catch (e) {
        res.status(400).send();
      }
    })
    .catch((err) => {
      res.status(401).send({
        success: false,
        message: "invalid credentials",
      });
    });
};

//@desc update all users
//@method PATCH
//@route /api/v1/user
//@access private
export const updateUsers = async (req, res, next) => {
  const body = pick(req.body, ["bio"]);

  try {
    const users = await User.updateMany(
      {},
      {
        $set: {
          bio: body.bio,
        },
      }
    );

    if (!users) throw new Error();

    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update all users
//@method DELETE
//@route /api/v1/user
//@access private
export const deleteUsers = async (req, res, next) => {
  try {
    const users = User.deleteMany({});

    if (!users) throw new Error();

    res.status(200).send({
      success: true,
      message: "deleted successfully",
      data: users,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc list user
//@route /api/v1/user/id
//@method POST
//@access private
export const getUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) throw new Error();

    res.status(201).send({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update user
//@method PATCH
//@route /api/v1/user/id
//@access private
export const updateUser = async (req, res, next) => {
  const id = req.params.id;

  const body = pick(req.body, ["firstname", "lastname", "age"]);

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          firstname: body.firstname,
          lastname: body.lastname,
          age: body.age,
        },
      },
      { returnOriginal: true }
    );

    res.status(201).send({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc delete all users
//@method DELETE
//@route /api/v1/user
//@access private
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = User.findByIdAndDelete(id);

    res.status(201).send({
      success: true,
      message: "user deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
