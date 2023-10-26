import { Link, useNavigate } from "react-router-dom";

// styles & images
import "./Navbar.css";

// icons
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { UserState } from "../context/AuthContext";
import SearchComponent from "./SearchComponent";
import Badge from "@mui/material/Badge";
import { BsBellFill } from "react-icons/bs";

// components
// import OffCanvas from './OffCanvas'

function Navbar() {
    // const { state, dispatch } = useContext(UserContext);
    const { auth, setAuth } = UserState();

    const navigate = useNavigate();

    const RenderMenu = () => {
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

        // if user is logged in
        // if (auth?.user) {
        return (
            <>
                <li
                    className="nav-item"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <SearchComponent />
                </li>
                {auth?.user && (
                    <li className="nav-item btn btn-light" type="button">
                        <Badge badgeContent={69} color="error">
                            <FaRegBell
                                style={{
                                    fontSize: "1.2rem",
                                }}
                            />
                        </Badge>
                    </li>
                )}

                <li
                    className="nav-item btn btn-light"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                >
                    <FaUserCircle style={userIcon} />
                </li>
            </>
        );
        // }
        // else {
        //     return (
        //         <>

        //             <li>
        //                 <Link
        //                     to="/login"
        //                     className="nav-item btn btn-outline-primary"
        //                 >
        //                     Login
        //                 </Link>
        //             </li>
        //             <li>
        //                 <Link
        //                     to="/signup"
        //                     className="nav-item btn btn-outline-primary"
        //                 >
        //                     Signup
        //                 </Link>
        //             </li>
        //         </>
        //     );
        // }
    };

    const userIcon = {
        fontSize: "1.5rem",
        // color : "white"
    };

    return (
        <nav className="navbar navbar-expand-md navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Pariyojana Sahayak
                </Link>
                <button
                    className="navbar-toggler"
                    style={{ backgroundColor: "white" }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                >
                    {/* {!user && */}
                    <ul className="nav">
                        <RenderMenu />
                    </ul>
                    {/* } */}

                    {/* {user && */}
                    {/* <ul className="nav"> */}
                    {/* <li className="nav-item btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
								Profile <FaUserCircle style={userIcon} />
								<OffCanvas />
							</li> */}
                    {/* <li className="nav-item">
								{!isPending && <button className="btn btn-outline-success" onClick={handleLogout} style={{ color: "white" }}>Logout</button>}
								{isPending && <button className="btn btn-outline-success" disabled>Logging out...</button>}
							</li> */}
                    {/* </ul> */}
                    {/* } */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
