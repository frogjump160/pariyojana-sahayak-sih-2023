import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Logout from "./components/Logout";
import Userdata from "./pages/userdata/Userdata";
import OffCanvas from "./components/OffCanvas";
import { UserState } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import SearchResults from "./pages/search/SearchResults";
import CreateProject from "./pages/projects/CreateProject";
import Projects from "./pages/projects/Projects";
import { Toaster } from "react-hot-toast";
import ProjectDetails from "./pages/projects/ProjectDetails";
import Profile from "./pages/profile/Profile";

const Routing = () => {
    const { auth } = UserState();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<SearchResults />} />

            <Route
                path="/login"
                element={!auth?.user ? <Login /> : <Navigate to="/" />}
            />
            <Route
                path="/signup"
                element={!auth?.user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
                path="/create-project"
                element={
                    auth?.user ? <CreateProject /> : <Navigate to="/login" />
                }
            />
            {/* <Route path="/signup" element={<Signup />} /> */}
            {/* <Route
                path="/projects"
                element={auth?.user ? <Projects /> : <Navigate to="/login" />}
            /> */}
            {auth?.user && <Route path="/projects" element={<Projects />} />}

            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/project_details/:id" element={<ProjectDetails />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userdata" element={<Userdata />} />
        </Routes>
    );
};

function App() {
    const { auth } = UserState();

    return (
        <div className="App">
            <div>
                <Toaster />
            </div>
            <Navbar />
            {/* {auth?.user && <OffCanvas />} */}
            <OffCanvas />
            <Routing />
        </div>
    );
}

export default App;
