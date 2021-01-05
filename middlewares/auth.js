import User from "../models/user.js";

export default (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).send({
      success: false,
      message: "User not authorized",
    });

  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;

      next();
    })
    .catch((e) => {
      res.status(401).send({
        success: false,
        message: "User not authorized",
      });
    });
};
