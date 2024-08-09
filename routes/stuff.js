import express from "express";
import functions from "../controllers/stuff.js";
import authentification from "../middleware/auth.js";
import multer from "../middleware/multer-config.js"

const router = express.Router();
router.get("/",authentification, functions.getAllThings);
router.post("/",authentification,multer, functions.createThing);
router.get("/:id",authentification, functions.getOneThing);
router.put("/:id",authentification,multer, functions.updateThing);
router.delete("/:id",authentification, functions.deleteThing);

export default router;
