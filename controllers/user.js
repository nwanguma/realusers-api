import User from "../models/user.js";
import pkg from "lodash";
const { pick } = pkg;

//@desc list all users
//@route /api/v1/user
//@method GET
//@access private
export const getUsers = (req, res, next) => {
  User.find({})
    .then((docs) => {
      if (!docs)
        return res.status({
          message: "success",
          status: res.status,
          data: [],
        });

      res.status(200).send({
        message: "success",
        status: res.status,
        data: docs,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(400).send({
        message: "error",
        status: res.status,
        data: {
          message: "An error occured",
        },
      });
    });
};

//@desc create user
//@route /api/v1/user
//@method POST
//@access private
export const createUser = (req, res, next) => {
  const body = pick(req.body, [
    "firstname",
    "lastname",
    "email",
    "password",
    "age",
    "bio",
  ]);
  const newUser = new User(body);

  newUser
    .save()
    .then(() => {
      return newUser.generateAuthToken();
    })
    .then((token) => {
      res.header("Authorization", token).status(201).send({
        success: true,
        message: "user created successfully",
        data: newUser,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message: "Bad request",
        error: err,
      });
    });
};

//@desc update all users
//@method PATCH
//@route /api/v1/user
//@access private
export const updateUsers = (req, res, next) => {
  const body = pick(req.body, ["bio"]);

  User.updateMany(
    {},
    {
      $set: {
        bio: body.bio,
      },
    }
  )
    .then((docs) => {
      res.status(200).send({
        message: "success",
        status: res.status,
        data: docs,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "error",
        status: res.status,
        data: {
          message: "An error occured",
        },
      });
    });
};

//@desc update all users
//@method DELETE
//@route /api/v1/user
//@access private
export const deleteUsers = (req, res, next) => {
  User.deleteMany({})
    .then((docs) => {
      res.status(200).send({
        success: true,
        message: "deleted successfully",
        status: res.status,
        data: docs,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "error",
        status: res.status,
        data: {
          message: "An error occured",
        },
      });
    });
};

//@desc list user
//@route /api/v1/user/id
//@method POST
//@access private
export const getUser = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((doc) => {
      res.status(201).send({
        message: "success",
        status: res.status,
        data: doc,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "error",
        status: res.status,
        data: {
          message: "An error occured",
        },
      });
    });
};

//@desc update user
//@method PATCH
//@route /api/v1/user/id
//@access private
export const updateUser = (req, res, next) => {
  const id = req.params.id;

  const body = pick(req.body, ["firstname", "lastname", "age"]);

  User.findByIdAndUpdate(
    id,
    {
      $set: {
        firstname: body.firstname,
        lastname: body.lastname,
        age: body.age,
      },
    },
    { returnOriginal: true }
  )
    .then((doc) => {
      res.status(201).send({
        message: "success",
        status: res.status,
        data: doc,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "error",
        status: res.status,
        data: {
          message: "An error occured",
        },
      });
    });
};

//@desc delete all users
//@method DELETE
//@route /api/v1/user
//@access private
export const deleteUser = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).send({
        success: true,
        message: "updated successfully",
        status: res.status,
        data: doc,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "error",
        status: res.status,
        data: {
          message: "An error occured",
        },
      });
    });
};
