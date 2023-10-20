import React, { useEffect, useState } from "react";
import { UserState } from "../../context/AuthContext";
import axios from "axios";

// styles
import "./Home.css";

// components
import SearchComponent from "../../components/SearchComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../components/LoadingAnimation";
import Dropdown from "../../components/Dropdown";

import { Link } from "react-router-dom";

function Home() {
    const { auth } = UserState();

    return (
        <div className="home-div container-fluid">
            <div>{auth?.user?._id}</div>
            <div>{auth?.user?.type}</div>
        </div>
    );
}

export default Home;
