import express from "express";
import { createClass, deleteClass, getClass, getClasses, updateClass } from "../controllers/classController.js";

// router object
const router = express.Router();

// classes routes
router.get("/all", getClasses);
router.get("/one", getClass);
router.post("/create", createClass);
router.put("/update", updateClass);
router.delete("/delete", deleteClass);

export default router;
