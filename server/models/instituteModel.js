import mongoose from "mongoose";

// defining student schema
const instituteSchema = new mongoose.Schema({
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

    institute_code: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    published_projects_list: {
        type: [String], // array of project _ids
    },

    ongoing_projects_list: {
        type: [String], // array of project _ids
    },

    profile_pic: {
        data: Buffer,
        contentType: String,
    },
});

// collection creation
export default new mongoose.model("INSTITUTE", instituteSchema);
