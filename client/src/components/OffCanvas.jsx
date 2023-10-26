import React from "react";
import ProfilePicture from "./ProfilePicture";

// styles
import "./OffCanvas.css";
import { NavLink, useNavigate } from "react-router-dom";

// icons
import { FaQuestionCircle } from "react-icons/fa";
import { BiMessageAltCheck } from "react-icons/bi";
import {
    AiFillPlusCircle,
    AiFillProject,
    AiOutlineUpload,
} from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";
import { RiAccountCircleFill, RiVideoAddLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { RiDraftLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { UserState } from "../context/AuthContext";

function OffCanvas() {
    const { auth, setAuth } = UserState();

    const navigate = useNavigate();

    const closeBtnStyle = {
        marginLeft: "auto",
        marginTop: "1rem",
        marginRight: "1rem",
        backgroundColor: "white",
    };

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });

        localStorage.removeItem("userInfo");

        navigate("/");

        // toast.success("Logout successfully");
    };

    return (
        <div
            className="offcanvas offcanvas-end"
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
        >
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={closeBtnStyle}
            ></button>
            <div className="offcanvas-header">
                <h5
                    className="offcanvas-title"
                    id="offcanvasWithBothOptionsLabel"
                >
                    {/* <ProfilePicture
                        src={user.photoURL}
                        displayName={user.displayName}
                    /> */}
                    <ProfilePicture
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9-73UZFtwlGMya7r7RPUm8N4na0r_TFLj0JUoh8j9W-2OYo&s"
                        // src={auth?.user?.imgUrl}
                        username={auth?.user?.name}
                        fontColor="#04514D"
                    />
                    {/* <p>{user.displayName}</p> */}
                </h5>
            </div>

            <div className="offcanvas-body" id="sidebar">
                <NavLink
                    to="/"
                    className="nav-link-item"
                    style={{ borderTop: "solid", borderColor: "#04514D" }}
                >
                    <AiOutlineHome className="offcanvas-icons" /> Home
                </NavLink>

                {!auth?.user && (
                    <>
                        <NavLink to={`/login`} className="nav-link-item">
                            <FiLogIn className="offcanvas-icons" />
                            Login
                        </NavLink>

                        <NavLink to="/signup" className="nav-link-item">
                            <RiAccountCircleFill className="offcanvas-icons" />
                            Sign Up
                        </NavLink>
                    </>
                )}

                {auth?.user && (
                    <>
                        <NavLink
                            to={`/profile/${auth?.user?._id}`}
                            className="nav-link-item"
                        >
                            <RiAccountCircleFill className="offcanvas-icons" />{" "}
                            Profile
                        </NavLink>

                        <NavLink to="/create-project" className="nav-link-item">
                            <AiFillPlusCircle className="offcanvas-icons" />{" "}
                            Create Project
                        </NavLink>

                        <NavLink to="/projects" className="nav-link-item">
                            <AiFillProject className="offcanvas-icons" />{" "}
                            Projects
                        </NavLink>

                        <NavLink
                            onClick={handleLogout}
                            to="/logout"
                            className="nav-link-item"
                        >
                            <FiLogOut className="offcanvas-icons" /> Logout
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}

export default OffCanvas;
