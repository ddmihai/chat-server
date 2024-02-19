import { Socket } from "socket.io";
import Room from "../../models/room.model";
import { RoomType } from "../../types/Room";
import { PushUserToRoomArray } from "../../helpers/pushUserToRoomArray";


export const createRoomController = async (data: RoomType, socket: Socket) => {       
    const room: RoomType = {
        roomName:       data.roomName || 'Room name',
        author:         data.author,
        privateRoom:    data.privateRoom,
        maxUsers:       data.maxUsers
    };

    // Create the room and update it. Push the original user inside the array room
    let newRoom = new Room(room);
    let createdRoom = await newRoom.save();

    if (createdRoom) {
        PushUserToRoomArray(createdRoom._id, room.author);
    }

    socket.emit('room_created', {
        message: 'Room created'
    });
}