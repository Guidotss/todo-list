import { isValidObjectId } from "mongoose"
import { db } from ".";
import { Entry, IEntry } from "../models";
import './db';

export const getEntriesById = async(id:string):Promise<IEntry | null> => {
    if(!isValidObjectId(id)) return null; 

    try{

        const entry = await Entry.findById(id).lean();
        
        return JSON.parse(JSON.stringify(entry));

    }catch(err){
        console.log(err);
        return null; 
    }


}