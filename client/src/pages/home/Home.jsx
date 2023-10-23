import React, { useEffect, useState } from "react";
import { UserState } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

// styles
import "./Home.css";

// components
import SearchComponent from "../../components/SearchComponent";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../components/LoadingAnimation";
import Dropdown from "../../components/Dropdown";

import { Link } from "react-router-dom";
import InfiniteScroll from "../../../node_modules/react-infinite-scroll-component/dist/index.es";
import ProjectCard from "../../components/ProjectCard";
import ProjectGrid from "../../components/ProjectGrid";

function Home() {
    const { auth } = UserState();
    const [skip, setSkip] = useState(0);
    const fetchLimit = 15;
    const [projectsList, setProjectsList] = useState([]);

    const fetchData = async () => {
        const fetchUrl = `/api/v1/projects/get-trending-projects?skip=${skip}&limit=${fetchLimit}`;

        const { data } = await axios.get(fetchUrl);

        if (data?.success === false) {
            toast.error("Something went wrong");
            return;
        }

        setProjectsList((prev) => {
            return [...prev, ...data.projects];
        });
    };

    useEffect(() => {
        fetchData();
    }, [skip]);

    return (
        <div className="home-div container-fluid">
            <div>{auth?.user?._id}</div>
            <div>{auth?.user?.type}</div>

            <h1>Trending Projects</h1>

            <InfiniteScroll
                dataLength={projectsList.length}
                next={() => {
                    setSkip(projectsList.length);
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <ProjectGrid projectList={projectsList} />
            </InfiniteScroll>
        </div>
    );
}

export default Home;
