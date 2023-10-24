import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";

import { format } from "date-fns";

import "./PublishedProject.css";

function PublishedProject({ project }) {
    return (
        <div>
            {project && (
                <>
                    <div>Published Project ID : {project._id}</div>
                    <h1
                        className="heading"
                        style={{ textAlign: "left", margin: "2rem" }}
                    >
                        {project?.title}
                    </h1>
                    <div>Host : {project.host_institute}</div>

                    {/* <div> */}
                    <div className="project-description">
                        {project.description}
                    </div>
                    {/* </div> */}

                    <div>
                        <div>
                            Project Start Date : &nbsp;
                            {format(
                                new Date(project?.start_date),
                                "dd-MM-yyyy"
                            )}
                        </div>

                        <div>
                            Project End Date : &nbsp;
                            {format(new Date(project?.end_date), "dd-MM-yyyy")}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PublishedProject;
