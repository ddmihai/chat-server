import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();


const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASEURL || '');
        if (mongoose.ConnectionStates.connected) {
            return console.log('Database connected');
        }

        if (mongoose.ConnectionStates.uninitialized) {
            return console.log('Connection is unitialized');
        }

        else if (mongoose.ConnectionStates.disconnected) {
            return console.log('Connection is disconnected');
        }

        else {
            return console.log('Database disconnected')
        }
    } 
    catch (error) {
        console.error(error);
        throw error;    
    }
};

export default databaseConnection;