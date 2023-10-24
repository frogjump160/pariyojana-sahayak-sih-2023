import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";

import { format } from "date-fns";

import "./ProjectDetails.css";
import PublishedProject from "./PublishedProject";
import ProjectOpening from "./ProjectOpening";

function ProjectDetails() {
    const { id } = useParams();

    const [project, setProject] = useState(null);

    const fetchProjectData = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/projects/get-project-details/${id}`
            );

            if (!data?.success) {
                throw "Could not fetch project details.";
            }

            console.log(data?.project);

            setProject(data?.project);
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        fetchProjectData();
    }, []);

    return (
        <div>
            {project && project.is_published && (
                <PublishedProject project={project} />
            )}

            {project && !project.is_published && (
                <ProjectOpening project={project} />
            )}
        </div>
    );
}

export default ProjectDetails;
