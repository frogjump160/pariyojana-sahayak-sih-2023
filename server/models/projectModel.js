import mongoose from "mongoose";

// defining student schema
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    
    description :{
    	type : String,
    	required : true,
    },

    tags_list: {
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

    thumbnail: {
        data: Buffer,
        contentType: String,
    },

    is_published: {
        type: Boolean,
    },

    start_date: Date,
    end_date: Date,
    application_start_date: Date,
    application_end_date: Date,
});

// collection creation
export default new mongoose.model("PROJECT", projectSchema);
