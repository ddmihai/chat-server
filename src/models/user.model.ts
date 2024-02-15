import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:   true,
        trim:       true,
        unique:     true,
        lowercase:    true
    },

    firstName: {
        type: String,
        required:   true,
        trim:       true
    },

    lastName: {
        type: String,
        required:   true,
        trim:       true
    },

    password: {
        type: String,
        required:   true,
        trim:       true
    },

    createdDate: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('Users', userSchema);
export default User;