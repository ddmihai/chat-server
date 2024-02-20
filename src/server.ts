import http from 'http';
import app from './app';
import databaseConnection from './database/connection';
import { Server } from 'socket.io';


// Types to be moved to SOCKET controllers
import { IncommingMessageController } from './controller/chats/incommingMessage';
import { createRoomController } from './controller/chats/create_room';
import { RoomType } from './types/Room';
import { IncomingMessageType } from './types/IncommingMessage';
import Room from './models/room.model';
import { PushUserToRoomArray } from './helpers/pushUserToRoomArray';



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

    // broadcast a message to the rooms
    socket.on('new_message', (data: IncomingMessageType) => IncommingMessageController(data, io));
    
   
 
    // create a room
    socket.on('create_room', (data: RoomType) => createRoomController(data, socket));



    //Find all rooms where the user is loggedin and included
    socket.on('get_user_rooms', async data => {   
        try {
            let userRooms = await Room.find({ users: { "$in": [data] }});
            socket.emit('user_rooms', userRooms);
        } 
        catch (error) {
            console.log('Error', error);    
        }
    });


    // push user to room array
    socket.on('invite_user', async data => {
        await PushUserToRoomArray(data.roomid, data.emailRequired)
        socket.emit('user_invited', {
            message: 'User invited'
        });
    });




    // join room
    type UserJoiningRoomData = {
        roomMongoDBObjectId: string,
        userJoining: string
    };

    socket.on('join_room', (data: UserJoiningRoomData) => {
        socket.join(data.roomMongoDBObjectId);
        socket.to(data.roomMongoDBObjectId).emit('new_message', { 
            message: `${data.userJoining} just joined the chat`
        });
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
