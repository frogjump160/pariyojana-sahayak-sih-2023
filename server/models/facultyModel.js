import mongoose from "mongoose";

// defining student schema
const facultySchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    employeeID: {
        type: String,
        required: true,
    },

    qualifications_and_specializations: {
        type: String,
        required: true,
    },

    published_projects_list: {
        type: [String], // array of project _ids
    },

    ongoing_projects_list: {
        type: [String], // array of project _ids
    },

    institute: {
        type: String,
    },

    profile_pic: {
        data: Buffer,
        contentType: String,
    },
});

// collection creation
export default new mongoose.model("FACULTY", facultySchema);
