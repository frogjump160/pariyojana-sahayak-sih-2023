import React from "react";
import ProfilePicture from "../../components/ProfilePicture";
import PublishedProject from "../projects/PublishedProject";
import { UserState } from "../../context/AuthContext";
import PublishedProjectsList from "../../components/PublisedProjectsList";

const Profile = () => {
    const { auth } = UserState();
    return (
        <>
            <ProfilePicture
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9-73UZFtwlGMya7r7RPUm8N4na0r_TFLj0JUoh8j9W-2OYo&s"
                username={auth?.user?.name}
                fontColor="#04514D"
            />
            {auth?.user && <PublishedProjectsList id={auth?.user?._id} />}
        </>
    );
};

export default Profile;
