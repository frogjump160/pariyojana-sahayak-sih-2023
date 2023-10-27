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
import Heading from "../../components/Heading";

function Projects() {
    const { auth } = UserState();
    const [skip, setSkip] = useState(0);
    const fetchLimit = 2;
    const [projectsList, setProjectsList] = useState([]);
    const [projectType, setProjectType] = useState("Published");
    // const [ongoingProjects, setOngoingProjects] = useState([]);
    // const [publishedProjects, setPublishedProjects] = useState([]);
    const [fetched, setFetched] = useState(0);

    const getOngoingProjectsList = async () => {
        try {
            const fetchUrl = `/api/v1/projects/get-ongoing-projects-list`;

            const { data } = await axios.get(fetchUrl);

            if (data?.success === false) {
                throw "Something went wrong";
            }

            // console.log(data?.projects?.ongoing_projects_list);
            // setOngoingProjects(data?.projects);
            return data?.projects;
        } catch (err) {
            toast.error(err);
        }
    };

    const getPublishedProjectsList = async () => {
        try {
            const fetchUrl = `/api/v1/projects/get-published-projects-list/${auth?.user?._id}`;

            const { data } = await axios.get(fetchUrl);

            if (data?.success === false) {
                throw "Something went wrong";
            }

            // console.log(data?.projects);
            // setPublishedProjects(data?.projects);
            return data?.projects;
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
        // console.log("here");
        // console.log(ongoingProjects);
        // console.log(publishedProjects);

        console.log(projectType);

        if (projectType === "Ongoing") {
            console.log("here ong");
            const ongoingProjects = await getOngoingProjectsList();
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

            setFetched(projectsList.length + arr.length);
            setProjectsList((prev) => {
                return [...prev, ...arr];
            });
        } else {
            console.log("here pub");
            const publishedProjects = await getPublishedProjectsList();
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

            setFetched(projectsList.length + arr.length);
            setProjectsList((prev) => {
                return [...prev, ...arr];
            });
        }
    };

    useEffect(() => {
        setProjectsList([]);
        setFetched(0);
        fetchProjects();
    }, [projectType]);

    // useEffect(() => {
    //     fetchProjects();
    // }, [fetched]);

    return (
        <div className="home-div container-fluid">
            {/* <div>{auth?.user?._id}</div>
            <div>{auth?.user?.type}</div> */}

            <Heading>YOUR PROJECTS</Heading>
            <Dropdown
                name={projectType}
                itemList={["Published", "Ongoing"]}
                setItem={setProjectType}
            />

            {/* <InfiniteScroll
                dataLength={projectsList.length}
                next={() => {
                    setFetched(projectsList.length);
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <ProjectGrid projectList={projectsList} />
            </InfiniteScroll> */}

            <InfiniteScroll
                dataLength={projectsList.length}
                next={fetchProjects}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <ProjectGrid projectList={projectsList} />
            </InfiniteScroll>
        </div>
    );
}

export default Projects;
