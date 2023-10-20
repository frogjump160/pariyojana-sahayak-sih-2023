import React, { useEffect, useState } from "react";
import { UserState } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

// styles
import "./SearchResults.css";

// components
import SearchComponent from "../../components/SearchComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../components/LoadingAnimation";
import Dropdown from "../../components/Dropdown";

// icons

// data

import axios from "axios";

function SearchResults() {
    const { query } = useParams();

    return <div className="SearchResults-div container-fluid"></div>;
}

export default SearchResults;
