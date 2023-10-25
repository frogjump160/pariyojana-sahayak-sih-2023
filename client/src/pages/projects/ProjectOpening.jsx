import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";

import { format } from "date-fns";

import "./ProjectOpening.css";
import InviteModal from "../../components/InviteModal";

function ProjectOpening({ project }) {
    const [inviteModalShow, setInviteModalShow] = useState(false);

    return (
        <div>
            {project && (
                <>
                    <div>Project ID : {project._id}</div>
                    <InviteModal
                        show={inviteModalShow}
                        onHide={() => {
                            setInviteModalShow(false);
                        }}
                    />
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
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={() => setInviteModalShow(true)}
                        >
                            Invite
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProjectOpening;
