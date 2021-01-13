import Promotion from "../models/promotion.js";
import lodash from "lodash";
const { pick } = lodash;

//@desc list all promotions
//@route /api/v1/promotion
//@method GET
//@access private
export const getPromotions = async (req, res, next) => {
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
    const docs = await Promotion.find(filters)
      .limit(limit || 0)
      .skip(skip || 0);

    const count = await Promotion.find(filters)
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

//@desc create promotion
//@route /api/v1/promotion
//@method POST
//@access private
export const createPromotion = async (req, res, next) => {
  const body = pick(req.body, [
    "company",
    "submitted",
    "type",
    "rewardType",
    "completed",
    "tags",
  ]);
  const newPromotion = new Promotion(body);

  try {
    const promotion = await newPromotion.save();

    if (!promotion) {
      throw new Error({ some: "error" });
    }

    res.status(201).send({
      success: true,
      message: "promotion created successfully",
      data: promotion,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Bad request",
      error,
    });
  }
};

//@desc update all promotions
//@method PATCH
//@route /api/v1/promotion
//@access private
export const updatePromotions = async (req, res, next) => {
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
    const promotions = await Promotion.updateMany({
      $set: updates,
    })
      .limit(limit)
      .skip(skip || 0);

    if (!promotions) {
      throw new Error();
    }

    res.status(200).send({
      success: true,
      data: promotions,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update all promotions
//@method DELETE
//@route /api/v1/promotion
//@access private
export const deletePromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.deleteMany({});

    if (!promotions) throw new Error();

    res.status(200).send({
      success: true,
      message: "promotions deleted successfully",
      data: docs,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc create promotion
//@route /api/v1/promotion/id
//@method POST
//@access private
export const getPromotion = async (req, res, next) => {
  const id = req.params.id;

  try {
    const promotion = await Promotion.findById(id);

    if (!promotion) throw new Error();

    res.status(201).send({
      success: true,
      data: promotion,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc update promotion
//@method PATCH
//@route /api/v1/promotion
//@access private
export const updatePromotion = async (req, res, next) => {
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
    const promotion = await Promotion.findByIdAndUpdate(
      id,
      {
        $set: {
          company: body.company,
        },
      },
      { returnOriginal: true }
    );

    if (!promotion) throw new Error();

    res.status(201).send({
      success: true,
      data: promotion,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};

//@desc delete all promotions
//@method DELETE
//@route /api/v1/promotion
//@access private
export const deletePromotion = async (req, res, next) => {
  const id = req.params.id;

  try {
    const promotion = await Promotion.findByIdAndDelete(id);

    if (!promotion) throw new Error();

    res.status(200).send({
      success: true,
      message: "promotion updated successfully",
      data: promotion,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
    });
  }
};
