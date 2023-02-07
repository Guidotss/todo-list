import mongoose from "mongoose";
import config from "./config";


export const connect = async () => {
    try{
        await mongoose.connect(config.MONGO_URL, config.options);
        console.log('Database connected');

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
connect();

export const disconnect = async () => {
    try{
        if(process.env.NODE_ENV === 'development') return; 
        await mongoose.disconnect();
        console.log('Database disconnected');

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

