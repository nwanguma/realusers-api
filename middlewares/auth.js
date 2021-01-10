import User from "../models/user.js";

export default async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).send({
      success: false,
      message: "User not authorized",
    });

  try {
    const user = await User.findByToken(token);

    if (!user)
      res.status(401).send({ success: false, message: "User not authorized" });

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(400).send({
      success: false,
    });
  }
};
