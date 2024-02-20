import Room from "../models/room.model";
import User from "../models/user.model";

export const PushUserToRoomArray = async (roomId: any, emailRequired: string) => {
    try {
        let userRequired = await User.findOne({ email: emailRequired });

        userRequired && await Room.findOneAndUpdate(
            { _id: roomId },
            {
               "$push": {
                   "users": userRequired._id
               }
            }
        );
    } 
    catch (error) {
        console.log(error);
        throw error;    
    }
}