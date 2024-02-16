import Room from "../models/room.model";

export const PushUserToRoomArray = async (roomId: any, userId: any) => {
    try {
        await Room.findOneAndUpdate(
            { _id: roomId },
            {
               "$push": {
                   "users": userId
               }
            }
         )
    } 
    catch (error) {
        console.log(error);
        throw error;    
    }
}