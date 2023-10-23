// get recent projects
import fs from "fs";

import projectModel from "../models/projectModel.js";

export const getTrendingProjectsController = async (req, res) => {
    try {
        const skip = req.query.skip;
        const limit = req.query.limit;

        const projects = await projectModel
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).send({
            success: true,
            projects,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Could not fetch trending projects",
            error,
        });
    }
};

// create project
export const createProjectController = async (req, res) => {
    try {
        // console.log(req.fields);
        const { title, description, tags_list, start_date } = req.fields;
        const { thumbnail } = req.files;

        //validation
        switch (true) {
            case !title:
                return res.status(500).send({ error: "Title is required" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "Description is required" });

            case !start_date:
                return res
                    .status(500)
                    .send({ error: "Project Start Date is required." });

            case thumbnail && thumbnail.size > 1000000:
                return res.status(500).send({
                    error: "Thumbnail is required and should be less than 1MB in size",
                });
        }

        const project = new projectModel({
            ...req.fields,
        });

        if (thumbnail) {
            project.thumbnail.data = fs.readFileSync(thumbnail.path);
            project.thumbnail.contentType = thumbnail.type;
        }

        await project.save();

        res.status(201).send({
            success: true,
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            error,
            message: "Error in creating project",
        });
    }
};

// get project thumbnail
export const projectThumbnailController = async (req, res) => {
    try {
        const project = await projectModel
            .findById(req.params.pid)
            .select("thumbnail");

        if (project.thumbnail.data) {
            res.set("Content-type", project.thumbnail.contentType);
            return res.status(200).send(project.thumbnail.data);
        }
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching project thumbnail",
        });
    }
};
