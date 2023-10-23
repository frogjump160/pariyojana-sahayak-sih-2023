import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

import "./CreateProject.css";
import { UserState } from "../../context/AuthContext";
import Dropdown from "../../components/Dropdown";
import { openingType } from "../../data/projectOpeningTypeList";

function CreateProject() {
    const { auth } = UserState();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [tags, setTags] = useState([]);
    const KeyCodes = {
        comma: 188,
        enter: 13,
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const [applicationStartDate, setApplicationStartDate] = useState("");
    const [applicationEndDate, setApplicationEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectOpeningType, setProjectOpeningType] =
        useState("Open For All");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let facultyList = [];

            if (auth?.user?.type === "Faculty") {
                facultyList.push(auth?.user?._id);
            }

            const projectData = new FormData();

            projectData.append("title", title);
            projectData.append("description", description);
            projectData.append("thumbnail", thumbnail);
            projectData.append("tags_list", tags);
            projectData.append("application_start_date", applicationStartDate);
            projectData.append("application_end_date", applicationEndDate);
            projectData.append("start_date", startDate);
            projectData.append("end_date", endDate);
            projectData.append("is_published", false);
            projectData.append("host_institute", auth?.user?.institute);
            projectData.append("faculty_list", facultyList);
            projectData.append("open_for", projectOpeningType);

            // projectData.append("category", category);

            // console.log(projectData);
            // for (var pair of projectData.entries()) {
            //     console.log(pair[0] + ", " + pair[1]);
            // }

            const { data } = await axios.post(
                `/api/v1/projects/create-project`,
                projectData
            );

            if (data?.success) {
                toast.success("Project created successfully");
                navigate("/");
            } else {
                toast.error(data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while creating project");
        }
    };

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };
    // const handleTagClick = (index) => {
    //     console.log("The tag at index " + index + " was clicked");
    // };

    return (
        <div>
            <div className="project-form">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Project title :
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="title"
                        autoComplete="off"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description :
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        aria-describedby="description"
                        autoComplete="off"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                    />
                </div>
                <div className="mb-3">
                    <ReactTags
                        tags={tags}
                        // suggestions={suggestions}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        // handleTagClick={handleTagClick}
                        inputFieldPosition="bottom"
                        autocomplete
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="application_start_date"
                        className="form-label"
                    >
                        Application Start Date :
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="application_start_date"
                        aria-describedby="application_start_date"
                        autoComplete="off"
                        onChange={(e) =>
                            setApplicationStartDate(e.target.value)
                        }
                        value={applicationStartDate}
                        // required
                    />
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="application_end_date"
                        className="form-label"
                    >
                        Application End Date :
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="application_end_date"
                        aria-describedby="application_end_date"
                        autoComplete="off"
                        onChange={(e) => setApplicationEndDate(e.target.value)}
                        value={applicationEndDate}
                        // required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="project_start_date" className="form-label">
                        Project Start Date (Required):
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="project_start_date"
                        aria-describedby="project_start_date"
                        autoComplete="off"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="project_end_date" className="form-label">
                        Project End Date :
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="project_end_date"
                        aria-describedby="project_end_date"
                        autoComplete="off"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                        // required
                    />
                </div>
                <div className="mb-3">
                    <label className="btn btn-outline-secondary col-md-12">
                        {thumbnail ? thumbnail.name : "Upload thumbnail"}
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            hidden
                        />
                    </label>
                </div>
                <div className="mb-3">
                    {thumbnail && (
                        <div className="text-center">
                            <img
                                src={URL.createObjectURL(thumbnail)}
                                alt="project_thumbnail"
                                height={"200px"}
                                className="img img-responsive"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="host_institute" className="form-label">
                        Host Institute :
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="host_institute"
                        aria-describedby="host_institute"
                        autoComplete="off"
                        value={auth?.user?.institute}
                        disabled
                        // required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="created_by_faculty" className="form-label">
                        Created By Faculty :
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="created_by_faculty"
                        aria-describedby="created_by_faculty"
                        autoComplete="off"
                        value={auth?.user?.name}
                        disabled
                        // required
                    />
                </div>

                <Dropdown
                    name={projectOpeningType}
                    itemList={openingType}
                    setItem={setProjectOpeningType}
                />

                <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default CreateProject;
