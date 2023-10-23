import React from "react";

// styles
import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";

// function ProjectCard({ project }) {
//     return (
//         <div className="col col-lg-3 col-md-6 col-sm-12 project-card">
//             <a href={`/project_details/${project.id}`}>
//                 <div
//                     // className="card"
//                     style={{
//                         width: "15rem",
//                         height: "10rem",
//                         overflow: "hidden",
//                         backgroundImage: `linear-gradient(to bottom, rgba(217, 221, 242, 0.52), rgb(83, 71, 71)), url(${project.imgUrl})`,
//                     }}
//                 ></div>
//             </a>
//         </div>
//     );
// }

function ProjectCard({ project }) {
    const navigate = useNavigate();

    const projectUrl = `/project_details/${project._id}`;
    const imageUrl = `api/v1/projects/project-thumbnail/${project._id}`;

    return (
        <div
            onClick={() => {
                navigate(projectUrl);
            }}
            className="col-lg-3 col-md-6 col-sm-12 project-card"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(217, 221, 242, 0.52), rgb(83, 71, 71)), url(${imageUrl})`,
            }}
        >
            <div className="project-title">{project.title}</div>
        </div>
    );
}

export default ProjectCard;
