import mongoose from "mongoose";

// defining student schema
const instituteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    category_tags_list: {
        type: [String], // // array of category names
    },

    faculty_list: {
        type: [String], // array of faculty _id s
    },

    student_list: {
        type: [String], // array of student _id s
    },

    host_institute: {
        type: String,
    },

    co_hosts_list: {
        type: [String],
    },

    profile_pic: {
        data: Buffer,
        contentType: String,
    },

    is_published: {
        type: Boolean,
    },
});

// collection creation
export default new mongoose.model("PROJECT", instituteSchema);
