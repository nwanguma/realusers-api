import Profile from "../models/profile.js";
import lodash from "lodash";

const { pick } = lodash;

//@desc create profile
//@route /api/v1/profile/
//@method POST
//@access private
export const createProfile = async (req, res, next) => {
  const user = req.user;
  const body = pick(req.body, [
    "firstname",
    "lastname",
    "occupation",
    "age",
    "bio",
  ]);
  const newProfile = new Profile({ ...body, user: user._id });

  try {
    const profile = await newProfile.save();

    res.status(201).send({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc list Profile
//@route /api/v1/profile/
//@method POST
//@access private
export const getProfile = async (req, res, next) => {
  const id = req.user._id;

  try {
    const profile = await Profile.findOne({ user: id }).populate("user");

    if (!profile) throw new Error();

    res.status(201).send({
      success: true,
      data: profile,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update Profile
//@method PATCH
//@route /api/v1/profile/
//@access private
export const updateProfile = async (req, res, next) => {
  const id = req.user._id;
  const body = pick(req.body, [
    "firstname",
    "lastname",
    "occupation",
    "age",
    "bio",
  ]);

  let updateBody = {};

  if (body.firstname) updateBody.firstname = body.firstname;
  if (body.lastname) updateBody.lastname = body.lastname;
  if (body.occupation) updateBody.occupation = body.occupation;
  if (body.age) updateBody.age = body.age;
  if (body.bio) updateBody.bio = body.bio;

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: id },
      {
        $set: updateBody,
      },
      { returnOriginal: false }
    );

    if (!profile) throw new Error();

    res.status(201).send({
      success: true,
      data: profile,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};
