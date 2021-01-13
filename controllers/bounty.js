import Bounty from "../models/bounty.js";
import lodash from "lodash";
const { pick } = lodash;

//@desc list all bounties
//@route /api/v1/bounty
//@method GET
//@access private
export const getBounties = async (req, res, next) => {
  let filters;
  const queries = pick(req.query, [
    "skip",
    "limit",
    "company",
    "type",
    "submitted",
    "rewardType",
    "immediate",
    "completed",
  ]);

  if (queries.company) filters.company = queries.company;
  if (queries.type) filters.type = queries.type;
  if (queries.submitted) filters.submitted = queries.submitted;
  if (queries.rewardType) filters.rewardType = queries.rewardType;
  if (queries.immediate) filters.immediate = queries.immediate;
  if (queries.completed) filters.completed = queries.completed;

  const skip = parseInt(queries.skip);
  const limit = parseInt(queries.limit);

  try {
    const docs = await Bounty.find(filters)
      .limit(limit || 0)
      .skip(skip || 0);

    const count = await Bounty.find(filters)
      .limit(limit || 0)
      .skip(skip || 0)
      .count();

    if (!docs)
      return res.status(200).send({
        success: true,
        data: [],
      });

    res.status(200).send({
      success: true,
      data: docs,
      pagination: {
        total: count,
      },
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
  let updates;
  const queries = pick(req.queries, [
    "skip",
    "limit",
    "company",
    "type",
    "submitted",
    "rewardType",
    "immediate",
    "completed",
  ]);

  if (queries.company) updates.company = queries.company;
  if (queries.type) updates.type = queries.type;
  if (queries.submitted) updates.submitted = queries.submitted;
  if (queries.rewardType) updates.rewardType = queries.rewardType;
  if (queries.immediate) updates.immediate = queries.immediate;
  if (queries.completed) updates.completed = queries.completed;

  const skip = parseInt(queries.skip);
  const limit = parseInt(queries.limit);

  try {
    const bounties = await Bounty.updateMany({
      $set: updates,
    })
      .limit(limit)
      .skip(skip || 0);

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
