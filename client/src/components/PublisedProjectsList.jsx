import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import Dropdown from "./Dropdown";
import InfiniteScroll from "react-infinite-scroll-component/dist/index.es";
import ProjectGrid from "./ProjectGrid";
import axios from "axios";
import toast from "react-hot-toast";
import { UserState } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const PublishedProjectsList = ({ id }) => {
    const { auth } = UserState();
    // const { id } = useParams();

    const [projectsList, setProjectsList] = useState([]);
    const [projects, setProjects] = useState([]);
    const [fetched, setFetched] = useState(0);
    const fetchLimit = 1;
    const [first, setFirst] = useState(true);

    const getPublishedProjectsList = async () => {
        try {
            const fetchUrl = `/api/v1/projects/get-published-projects-list/${id}`;

            const { data } = await axios.get(fetchUrl);

            if (data?.success === false) {
                throw "Something went wrong";
            }

            console.log(data?.projects);
            setProjectsList(data?.projects);
        } catch (err) {
            toast.error(err);
        }
    };

    // const ids = getPublishedProjectsList();

    // console.log(ids);

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
        let arr = [];

        // for (let i = 0; i < projectsList.length; i++) {
        //     arr.push(await fetchProjectById(projectsList[i]));
        // }

        for (
            let i = 0;
            i < fetchLimit && i + fetched < projectsList.length;
            i++
        ) {
            arr.push(await fetchProjectById(projectsList[i + fetched]));
        }

        console.log(arr);

        setProjects((prev) => {
            return [...prev, ...arr];
        });
    };

    // const arr = getPublishedProjectsList();

    useEffect(() => {
        getPublishedProjectsList();
        // fetchProjects();
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [projectsList.length, fetched]);

    return (
        <div className="home-div container-fluid">
            <Heading>YOUR PROJECTS</Heading>

            <InfiniteScroll
                dataLength={projects.length}
                next={() => {
                    setFetched(projects.length);
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <ProjectGrid projectList={projects} />
            </InfiniteScroll>
        </div>
    );
};

export default PublishedProjectsList;
