import express from "express";
import { handleLogout } from "../controllers/logoutContoller";

const router = express.Router();

router.post("/", handleLogout);

module.exports = router;
