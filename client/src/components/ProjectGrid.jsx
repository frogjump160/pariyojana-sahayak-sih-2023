import React from "react";

//styles
import "./ProjectGrid.css";

// components
import ProjectCard from "./ProjectCard";

function ProjectGrid({ projectList }) {
    return (
        <div className="project-grid-holder container">
            <div className="project-grid row justify-content-center">
                {projectList.map((project, index) => {
                    return <ProjectCard project={project} key={project._id} />;
                })}
            </div>
        </div>
    );
}

export default ProjectGrid;
