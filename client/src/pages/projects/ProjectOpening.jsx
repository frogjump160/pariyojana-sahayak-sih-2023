import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import { MdModeEditOutline } from "react-icons/md"
import { format } from "date-fns";

import {ImCross} from "react-icons/im";
import {TiTick} from "react-icons/ti";

import "./ProjectOpening.css";
import InviteModal from "../../components/InviteModal";

function ProjectOpening({ project }) {
    const [inviteModalShow, setInviteModalShow] = useState(false);
    const authorsList = ["Arin", "Saptarshi", "Upayan"];
    const applicantsList = ["Parthiv", "Spandan", "Sudipta"];
    const tagsList = ["AI", "ML", "Web Dev"];
    return (
        <div>
            {project && (
                <>
                    <InviteModal
                        show={inviteModalShow}
                        onHide={() => {
                            setInviteModalShow(false);
                        }}
                    />

                    <div className = "upper-container">
                        <div className="heading heading-ong">
                            <h1>
                                {project?.title.toUpperCase()}
                            </h1>
                            <MdModeEditOutline className="ongoing-icons light"
                            style={{fontSize : "2rem"}}
                            />
                        </div>

                        <div className="dates">
                            Application Start Date : &nbsp;
                            {/* {project?.application_start_date} */}
                            {format(
                                new Date(project?.application_start_date),
                                "dd/MM/yyyy"
                            )}
                        </div>

                        <div className="dates">
                            Application End Date : &nbsp;
                            {format(
                                new Date(project?.application_end_date),
                                "dd-MM-yyyy"
                            )}
                        </div>

                        <div className="dates">
                            Project Start Date : &nbsp;
                            {format(
                                new Date(project?.start_date),
                                "dd-MM-yyyy"
                            )}
                        </div>

                        <div className="dates">
                            Project End Date : &nbsp;
                            {format(new Date(project?.end_date), "dd-MM-yyyy")}
                        <MdModeEditOutline className="ongoing-icons light"
                            style={{fontSize : "1.3rem"}}
                            />
                        </div>
                    </div>
 
                    <div className="middle-container">
                        <div className="left-container">
                            <div className="project-description">
                                <h5>DESCRIPTION <MdModeEditOutline className="ongoing-icons light"
                            style={{fontSize : "1.3rem"}}
                            /></h5>
                                {project.description}
                            </div>

                            <div className="open-for">
                                {project.open_for}
                            </div>
                        </div>
                        <div className="right-container">
                            <div className="project-authors">
                                <h5>AUTHORS</h5>
                                {authorsList.map((n, i) => (
                                    <p key={i}>{n} <ImCross style={{marginLeft : "1rem"}} /></p>
                                ))}
                            </div>
                            
                            {/* <div className="view-code-btn">
                                <h5>VIEW CODE</h5>
                            </div> */}
                            
                            <div className="view-code-btn" onClick={() => setInviteModalShow(true)}>
                                <h5>
                                    Invite
                                </h5>
                            </div>

                            <div className="project-authors">
                                <h5>
                                    Applicants
                                </h5>
                                {applicantsList.map((n, i) => (
                                    <p key={i}>{n} <TiTick style={{ fontSize : "1.8rem"}} /> <ImCross style={{marginLeft : "1rem"}} /></p>
                                ))}
                            </div>

                            <div className="project-tags">
                                <h5>TAGS</h5>
                                {tagsList.map((n, i) => (
                                    <p key={i}>{n} <ImCross style={{marginLeft : "1rem"}} /></p>
                                ))}
                            </div>
                        </div>
                    </div>

                    
                </>
            )}
        </div>
    );
}

export default ProjectOpening;
