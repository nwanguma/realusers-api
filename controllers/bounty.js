import Bounty from "../models/bounty.js";
import pkg from "lodash";
const { pick } = pkg;

//@desc list all bounties
//@route /api/v1/bounty
//@method GET
//@access private
export const getBounties = (req, res, next) => {
  Bounty.find({})
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

//@desc create bounty
//@route /api/v1/bounty
//@method POST
//@access private
export const createBounty = (req, res, next) => {
  const body = pick(req.body, [
    "company",
    "submitted",
    "type",
    "rewardType",
    "completed",
    "tags",
  ]);
  const newBounty = new Bounty(body);

  newBounty
    .save()
    .then((doc) => {
      res.status(201).send({
        success: true,
        message: "bounty created successfully",
        data: doc,
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

//@desc update all bounties
//@method PATCH
//@route /api/v1/bounty
//@access private
export const updateBounties = (req, res, next) => {
  Bounty.updateMany({})
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

//@desc update all bounties
//@method DELETE
//@route /api/v1/bounty
//@access private
export const deleteBounties = (req, res, next) => {
  Bounty.deleteMany({})
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

//@desc create bounty
//@route /api/v1/bounty
//@method POST
//@access private
export const getBounty = (req, res, next) => {
  const id = req.params.id;

  Bounty.findById(id)
    .then((doc) => {
      if (!doc)
        return res.status(404).send({
          success: false,
          message: "User not found",
        });

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

//@desc update all bounties
//@method PATCH
//@route /api/v1/bounty
//@access private
export const updateBounty = (req, res, next) => {
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

  Bounty.findByIdAndUpdate(
    id,
    {
      $set: {
        company: body.company,
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

//@desc update all bounties
//@method DELETE
//@route /api/v1/bounty
//@access private
export const deleteBounty = (req, res, next) => {
  const id = req.params.id;

  Bounty.findByIdAndDelete(id)
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
