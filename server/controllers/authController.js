import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import studentModel from "../models/studentModel.js";
import facultyModel from "../models/facultyModel.js";
import instituteModel from "../models/instituteModel.js";

export const registerController = async (req, res) => {
    try {
        // const { username, email, password } = req.body;

        let userData = req.body;

        // validations
        // if (!username) {
        //     return res.send({ message: "Username is Required." });
        // }

        if (!userData?.email) {
            return res.send({ message: "Email is Required." });
        }

        if (!userData?.password) {
            return res.send({ message: "Password is Required." });
        }

        let userModel;

        switch (userData?.type) {
            case "Student":
                userModel = studentModel;
                break;

            case "Faculty":
                userModel = facultyModel;
                break;

            case "Institute":
                userModel = instituteModel;
                break;
        }

        // checking user
        const existingUser = await userModel.findOne({ email: userData.email });

        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered, please login",
            });
        }

        // register user
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;

        // save
        const user = await new userModel(userData).save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password, type } = req.body;

        if (!email || !password || !type) {
            return res.status(404).send({
                success: false,
                message: "Invalid email / password / type",
            });
        }

        let userModel;

        switch (type) {
            case "Student":
                userModel = studentModel;
                break;

            case "Faculty":
                userModel = facultyModel;
                break;

            case "Institute":
                userModel = instituteModel;
                break;
        }

        // check user
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered.",
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password.",
            });
        }

        // token
        const token = JWT.sign(
            { _id: user._id, type: type },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                // email: user.email,
                type: type,
                // imgUrl: user.imgUrl,
            },
            token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
};

// update profile picture
// export const updateProfilePictureController = async (req, res) => {
//     try {
//         const { imgUrl } = req.body;

//         // update imgUrl of the user
//         const userID = req.user._id;

//         await userModel.updateOne({ _id: userID }, { imgUrl: imgUrl });

//         res.status(200).send({
//             success: true,
//             message: "Profile picture updated successfully.",
//         });
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "Could not update profile picture.",
//             error,
//         });
//     }
// };
