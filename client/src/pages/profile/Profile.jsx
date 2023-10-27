import React from "react";
import ProfilePicture from "../../components/ProfilePicture";
import PublishedProject from "../projects/PublishedProject";
import { UserState } from "../../context/AuthContext";
import PublishedProjectsList from "../../components/PublisedProjectsList";

import "./Profile.css";

const Profile = () => {
    const { auth } = UserState();
    return (
        <>
            <div className="profile-upper-container">
                <div className="profile-container-left">
                    <ProfilePicture
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9-73UZFtwlGMya7r7RPUm8N4na0r_TFLj0JUoh8j9W-2OYo&s"
                        username={auth?.user?.name}
                        fontColor="#0F7B77"
                        imgSize="20rem"
                    />
                </div>
                <div className="profile-container-right">
                    <h3><span className="profile-labels">Email:</span> faculty2@email.com</h3>
                    <h3><span className="profile-labels">Institute:</span> Jadavpur University</h3>
                    <h3><span className="profile-labels">Specialization:</span> QT</h3>
                    <h3><span className="profile-labels">Employee ID: </span>JU1234</h3>
                </div>
            </div>
            {auth?.user && <PublishedProjectsList id={auth?.user?._id} />}
        </>
    );
};

export default Profile;
