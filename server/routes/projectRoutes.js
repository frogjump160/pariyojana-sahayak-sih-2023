import express from "express";
import {
    createProjectController,
    getOngoingProjectsListController,
    getProjectDetailsByIdController,
    getPublishedProjectsListController,
    getTrendingProjectsController,
    projectThumbnailController,
} from "../controllers/projectController.js";

import formidable from "express-formidable";
import { requireSignIn } from "../middleware/authenticate.js";

// router object
const router = express.Router();

// get trending projects
router.get("/get-trending-projects", getTrendingProjectsController);

// get user's ongoing projects
router.get(
    "/get-ongoing-projects-list",
    requireSignIn,
    getOngoingProjectsListController
);

// get user's published mprojects (ongoing / published)
router.get(
    "/get-published-projects-list",
    // requireSignIn,
    getPublishedProjectsListController
);

// get project details by id
router.get("/get-project-details/:pid", getProjectDetailsByIdController);
// get project thumbnail
router.get("/project-thumbnail/:pid", projectThumbnailController);

router.post(
    "/create-project",
    requireSignIn,
    formidable(),
    createProjectController
);

export default router;
