import mongoose from "mongoose";

interface Config {
    MONGO_URL: string;
    options:object; 
}

mongoose.set('strictQuery', true);

const config:Config = {
    MONGO_URL: process.env.MONGO_URL || '',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}


export default config; 
