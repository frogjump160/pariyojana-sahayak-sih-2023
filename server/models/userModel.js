import mongoose from "mongoose";

// defining user schema
const userSchema = new mongoose.Schema({
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

    type: {
        type: String,
        required: true,
    },
});

// collection creation
export default mongoose.model("USER", userSchema);
