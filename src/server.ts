import http from 'http';
import app from './app';
import databaseConnection from './database/connection';
import { Server } from 'socket.io';


// Types to be moved to SOCKET controllers
import { IncommingMessageController } from './controller/chats/incommingMessage';
import { createRoomController } from './controller/chats/create_room';
import { RoomType } from './types/Room';
import { IncomingMessageType } from './types/IncommingMessage';



const port = process.env.PORT || 3001;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
});




io.on('connection', socket => {

    // broadcast a message to the room
    socket.on('incomingMessage', (data: IncomingMessageType) => IncommingMessageController(data, io));


    // create a room
    socket.on('create_room', (data: RoomType) => createRoomController(data, socket));




    // join room
    // socket.on('join_room', async data => {
    //     let roomToJoin = await Room.findById(data.roomId);
    //     if (roomToJoin) {
            
    //     }
    // })
    socket.on('join_room', (data) => {
        socket.emit('new_message', 'New user joinedds')
        socket.join(data.roomMongoDBObjectId);
    });

    
});



const startServer = async () => {
    server.listen(port, () => {
        console.log('server online')
    });

    //connect to database
    await databaseConnection();
}


startServer();
