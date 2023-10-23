import express from "express";
import {
    createProjectController,
    getTrendingProjectsController,
    projectThumbnailController,
} from "../controllers/projectController.js";

import formidable from "express-formidable";

// router object
const router = express.Router();

// get trending projects
router.get("/get-trending-projects", getTrendingProjectsController);

// get project thumbnail
router.get("/project-thumbnail/:pid", projectThumbnailController);

router.post("/create-project", formidable(), createProjectController);

export default router;
