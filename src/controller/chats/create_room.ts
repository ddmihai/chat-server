import { Socket } from "socket.io";
import Room from "../../models/room.model";
import { RoomType } from "../../types/Room";

export const createRoomController = async (data: RoomType, socket: Socket) => {       
    const room: RoomType = {
        roomName:       data.roomName || 'Room name',
        author:         data.author,
        users:          data.users,
        privateRoom:    data.privateRoom,
        maxUsers:       data.maxUsers
    };

    let newRoom = new Room(room);
    await newRoom.save();

    socket.emit('room_created', {
        message: 'Room created'
    });
}