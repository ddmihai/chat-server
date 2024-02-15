import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        trim: true
    }, 

    author: {
        type:   mongoose.Schema.Types.ObjectId,
        ref:    'Users' 
    }, 
    
    users: {
        type:   [mongoose.Schema.Types.ObjectId],
        ref:    'Users'
    }, 
    
    privateRoom: {
        type:   Boolean,
        default: true
    }, 
    
    maxUsers: {
        type:   Number,
        default: 2
    }
});

const Room = mongoose.model('Rooms', roomSchema);
export default Room;