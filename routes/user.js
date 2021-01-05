import express from "express";
import {
  getUsers,
  createUser,
  updateUsers,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user.js";

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(createUser)
  .patch(updateUsers)
  .delete(deleteUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.post("/login", loginUser);

export default router;
