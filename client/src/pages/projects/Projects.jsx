import React, { useEffect, useState } from "react";
import { UserState } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

// styles
import "./Projects.css";

import { Link } from "react-router-dom";
import InfiniteScroll from "../../../node_modules/react-infinite-scroll-component/dist/index.es";
import ProjectCard from "../../components/ProjectCard";
import ProjectGrid from "../../components/ProjectGrid";
import Dropdown from "../../components/Dropdown";

function Projects() {
    const { auth } = UserState();
    const [skip, setSkip] = useState(0);
    const fetchLimit = 1;
    const [projectsList, setProjectsList] = useState([]);
    const [projectType, setProjectType] = useState("Published");
    const [ongoingProjects, setOngoingProjects] = useState([]);
    const [publishedProjects, setPublishedProjects] = useState([]);
    const [fetched, setFetched] = useState(0);

    const getOngoingProjectsList = async () => {
        try {
            const fetchUrl = `/api/v1/projects/get-ongoing-projects-list`;

            const { data } = await axios.get(fetchUrl);

            if (data?.success === false) {
                throw "Something went wrong";
            }

            console.log(data?.projects?.ongoing_projects_list);
            setOngoingProjects(data?.projects);
        } catch (err) {
            toast.error(err);
        }
    };

    const getPublishedProjectsList = async () => {
        try {
            const fetchUrl = `/api/v1/projects/get-published-projects-list`;

            const { data } = await axios.get(fetchUrl);

            if (data?.success === false) {
                throw "Something went wrong";
            }

            console.log(data?.projects);
            setPublishedProjects(data?.projects);
        } catch (err) {
            toast.error(err);
        }
    };

    const fetchProjectById = async (id) => {
        try {
            const { data } = await axios.get(
                `/api/v1/projects/get-project-details/${id}`
            );

            if (data?.success === false) {
                throw new Error("Could not fetch project");
            }

            return data?.project;
        } catch (err) {
            toast.error(err.message, {
                position: "top-center",
            });
        }
    };

    const fetchProjects = async () => {
        console.log("here");
        console.log(ongoingProjects);
        console.log(publishedProjects);
        if (projectType === "Ongoing") {
            let arr = [];
            // let count = 0;
            for (
                let i = 0;
                i < fetchLimit && i + fetched < ongoingProjects.length;
                i++
            ) {
                arr.push(await fetchProjectById(ongoingProjects[i + fetched]));
                // count++;
            }

            setProjectsList((prev) => {
                return [...prev, ...arr];
            });
        } else {
            let arr = [];
            // let count = 0;
            for (
                let i = 0;
                i < fetchLimit && i + fetched < publishedProjects.length;
                i++
            ) {
                arr.push(
                    await fetchProjectById(publishedProjects[i + fetched])
                );
                // count++;
            }

            console.log("test");
            console.log(arr);

            setProjectsList((prev) => {
                return [...prev, ...arr];
            });
        }
    };

    useEffect(() => {
        getPublishedProjectsList();
        getOngoingProjectsList();
        // fetchProjects();
        // setProjectType("Published");
    }, []);

    useEffect(() => {
        setProjectsList([]);
        setFetched(0);
        fetchProjects();
    }, [projectType]);

    useEffect(() => {
        fetchProjects();
    }, [fetched]);

    // useEffect(() => {
    //     fetchData();
    // }, [skip]);

    // useEffect(() => {
    //     setProjectsList([]);
    //     setSkip(0);
    // }, [projectType]);

    return (
        <div className="home-div container-fluid">
            <div>{auth?.user?._id}</div>
            <div>{auth?.user?.type}</div>

            <h1>Your Projects</h1>
            <Dropdown
                name={projectType}
                itemList={["Published", "Ongoing"]}
                setItem={setProjectType}
            />

            <InfiniteScroll
                dataLength={projectsList.length}
                next={() => {
                    setFetched(projectsList.length);
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <ProjectGrid projectList={projectsList} />
            </InfiniteScroll>
        </div>
    );
}

export default Projects;
