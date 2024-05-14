import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getOneUser,
  updateUser,
} from "../../controllers/usersController";

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route("/:id")
  .get(getOneUser);

module.exports = router;
