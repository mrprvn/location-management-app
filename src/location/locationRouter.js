import { Router } from "express";
import {
  addLocation,
  getAllLocations,
  uploadLocationFile,
} from "./locationController.js";
import authenticate from "../middleware/authenticate.js";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// file store local
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50mb
});

router.post("/add", authenticate, addLocation);
router.post(
  "/upload",
  authenticate,
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),

  uploadLocationFile
);
router.get("/", authenticate, getAllLocations);

export default router;
