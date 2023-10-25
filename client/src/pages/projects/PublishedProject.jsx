import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";

import { format } from "date-fns";

import "./PublishedProject.css";

function PublishedProject({ project }) {
    const authorsList = ["Arin", "Saptarshi", "urmom"];
    const tagsList = ["AI", "ML", "Web Dev"];

    return (
        <div>
            {project && (
                <>
                    <div className = "upper-container">
                        <h1 className="heading heading-pub">
                            {project?.title.toUpperCase()}
                        </h1>

                        <div className="dates">
                            Start Date : &nbsp;
                            {format(
                                new Date(project?.start_date),
                                "dd-MM-yyyy"
                            )}
                        </div>

                        <div className="dates">
                            End Date : &nbsp;
                            {format(new Date(project?.end_date), "dd-MM-yyyy")}
                        </div>
                    </div>

                    <div className="middle-container">
                        <div className="left-container">
                            <div className="project-description">
                                <h5>DESCRIPTION</h5>
                                {project.description}
                            </div>

                            <div className="pdf-div">
                                <object
                                    data="https://www.africau.edu/images/default/sample.pdf"
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                ></object>
                            </div>

                            <div className="project-comments">
                                <h5>COMMENTS</h5>
                                {project.description}
                            </div>
                        </div>
                        <div className="right-container">
                            <div className="project-authors">
                                <h5>AUTHORS</h5>
                                {authorsList.map((n, i) => (
                                    <p key={i}>{n}</p>
                                ))}
                            </div>
                            
                            <div className="view-code-btn">
                                <h5>VIEW CODE</h5>
                            </div>

                            <div className="project-tags">
                                <h5>TAGS</h5>
                                {tagsList.map((n, i) => (
                                    <p key={i}>{n}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
}

export default PublishedProject;
