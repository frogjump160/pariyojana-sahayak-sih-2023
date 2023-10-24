import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";

import { format } from "date-fns";

import "./ProjectOpening.css";

function ProjectOpening({ project }) {
    // const { id } = useParams();

    // const [project, setProject] = useState(null);

    // const fetchProjectData = async () => {
    //     try {
    //         const { data } = await axios.get(
    //             `/api/v1/projects/get-project-details/${id}`
    //         );

    //         if (!data?.success) {
    //             throw "Could not fetch project details.";
    //         }

    //         console.log(data?.project);

    //         setProject(data?.project);
    //     } catch (error) {
    //         toast.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchProjectData();
    // }, []);

    return (
        <div>
            {project && (
                <>
                    <div>Project ID : {project._id}</div>
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
                            Application Start Date : &nbsp;
                            {/* {project?.application_start_date} */}
                            {format(
                                new Date(project?.application_start_date),
                                "dd/MM/yyyy"
                            )}
                        </div>

                        <div>
                            Application End Date : &nbsp;
                            {format(
                                new Date(project?.application_end_date),
                                "dd-MM-yyyy"
                            )}
                        </div>

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

export default ProjectOpening;
