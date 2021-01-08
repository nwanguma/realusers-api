import Bounty from "../models/bounty.js";
import pkg from "lodash";
const { pick } = pkg;

//@desc list all bounties
//@route /api/v1/bounty
//@method GET
//@access private
export const getBounties = async (req, res, next) => {
  try {
    const docs = await Bounty.find({});

    if (!docs)
      return res.status(200).send({
        success: true,
        data: [],
      });

    res.status(200).send({
      success: true,
      data: docs,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      data: null,
    });
  }
};

//@desc create bounty
//@route /api/v1/bounty
//@method POST
//@access private
export const createBounty = async (req, res, next) => {
  const body = pick(req.body, [
    "company",
    "submitted",
    "type",
    "rewardType",
    "completed",
    "tags",
  ]);
  const newBounty = new Bounty(body);

  try {
    const bounty = await newBounty.save();

    if (!bounty) {
      throw new Error({ some: "error" });
    }

    res.status(201).send({
      success: true,
      message: "bounty created successfully",
      data: bounty,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Bad request",
      error,
    });
  }
};

//@desc update all bounties
//@method PATCH
//@route /api/v1/bounty
//@access private
export const updateBounties = async (req, res, next) => {
  try {
    const bounties = await Bounty.updateMany({});

    if (!bounties) {
      throw new Error();
    }

    res.status(200).send({
      success: true,
      data: bounties,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update all bounties
//@method DELETE
//@route /api/v1/bounty
//@access private
export const deleteBounties = async (req, res, next) => {
  try {
    const bounties = await Bounty.deleteMany({});

    if (!bounties) throw new Error();

    res.status(200).send({
      success: true,
      message: "bounties deleted successfully",
      data: docs,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc create bounty
//@route /api/v1/bounty/id
//@method POST
//@access private
export const getBounty = async (req, res, next) => {
  const id = req.params.id;

  try {
    const bounty = await Bounty.findById(id);

    if (!bounty) throw new Error();

    res.status(201).send({
      success: true,
      data: bounty,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update all bounties
//@method PATCH
//@route /api/v1/bounty
//@access private
export const updateBounty = async (req, res, next) => {
  const id = req.params.id;

  const body = pick(req.body, [
    "company",
    "submitted",
    "type",
    "rewardType",
    "immediate",
    "completed",
    "tags",
  ]);

  try {
    const bounty = await Bounty.findByIdAndUpdate(
      id,
      {
        $set: {
          company: body.company,
        },
      },
      { returnOriginal: true }
    );

    if (!bounty) throw new Error();

    res.status(201).send({
      success: true,
      data: bounty,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update all bounties
//@method DELETE
//@route /api/v1/bounty
//@access private
export const deleteBounty = async (req, res, next) => {
  const id = req.params.id;

  try {
    const bounty = await Bounty.findByIdAndDelete(id);

    if (!bounty) throw new Error();

    res.status(200).send({
      success: true,
      message: "bounty updated successfully",
      data: bounty,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};
