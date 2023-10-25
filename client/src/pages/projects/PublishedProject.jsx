import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import { Document, Page } from "react-pdf";

import { format } from "date-fns";

import "./PublishedProject.css";

function PublishedProject({ project }) {
    const authorsList = ["Arin", "Saptarshi", "urmom"];

    return (
        <div>
            {project && (
                <>
                    {/* <div>Published Project ID : {project._id}</div> */}
                    <h1
                        className="heading"
                        style={{ textAlign: "left", margin: "2rem" }}
                    >
                        {project?.title.toUpperCase()}
                    </h1>
                    {/* <div>Host : {project.host_institute}</div> */}

                    {/* <div> */}
                    <div className="upper-container">
                        <div className="project-description">
                            <h5>DESCRIPTION</h5>
                            {project.description}
                        </div>
                        {/* </div> */}

                        <div className="project-authors">
                            <h5>AUTHORS</h5>
                            {authorsList.map((n, i) => (
                                <p key={i}>{n}</p>
                            ))}
                        </div>
                    </div>

                    {/* <div>
                        <Document
                            file={
                                "https://drive.google.com/file/d/12FN-xEIg38gz27Da1NsqtZBvY6QthoYl/view?usp=drive_link"
                            }
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    </div> */}

                    <div className="pdf-div">
                        <object
                            data="https://www.africau.edu/images/default/sample.pdf"
                            type="application/pdf"
                            width="50%"
                            height="100%"
                        ></object>
                    </div>

                    {/* <div>
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
                    </div> */}
                </>
            )}
        </div>
    );
}

export default PublishedProject;
