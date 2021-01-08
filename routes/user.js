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
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, getUsers)
  .post(authenticate, createUser)
  .patch(authenticate, updateUsers)
  .delete(authenticate, deleteUsers);

router
  .route("/:id")
  .get(authenticate, getUser)
  .patch(authenticate, updateUser)
  .delete(authenticate, deleteUser);

router.post("/login", loginUser);

export default router;
