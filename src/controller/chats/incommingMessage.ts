import { Server } from "socket.io";
import { IncomingMessageType } from "../../types/IncommingMessage";

export const IncommingMessageController = (data: IncomingMessageType, io: Server) => {
    console.log(data)
    io.to(data.roomMongoDBObjectId).emit('new_message', {
        message:    data.message,
        author:     data.author
    });
}