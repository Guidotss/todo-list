import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers';
import { db } from '../../../dataBase';
import { Entry, IEntry } from '../../../models';
import '../../../dataBase/db';

type Data = 
    |{ message?: string }
    |IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query; 

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:'Id no valido'});
    }

    switch(req.method){
        case'GET':
            return getEntryById(req,res); 
        case 'PUT':
            return updateEntry(req,res);
        
        case 'DELETE':
            return deleteEntry(req,res);
        default:
            return res.status(400).json({message:'Endpoint no existe'});
    }


}

const updateEntry = async (req:NextApiRequest,res:NextApiResponse<Data>) => {
    try{
        
        const { id } = req.query;
        const entryToUpdate = await Entry.findById(id);
        
        if(!entryToUpdate){
            return res.status(404).json({message:`No existe entrada con ID: ${id}`});
        }

        const { 
            description= entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body;

        const updatedEntry = await Entry.findByIdAndUpdate(id,{description, status}, {runValidators:true, new:true});

        return res.status(200).json(updatedEntry!); 


    }catch(err){
        console.log(err);
        await db.disconnect();
        return res.status(500).json({message:'Error al actualizar la entrada'});
    }
}

const getEntryById = async(req:NextApiRequest, res:NextApiResponse<Data>) => {
    try{

        const { id } = req.query;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({message:'Id no valido'});
        }
        const entry = await Entry.findById(id);
        
        return res.status(200).json(entry!);

    }catch(err){
        console.log(err);
        await db.disconnect();
        return res.status(500).json({message:'Error al obtener la entrada'});
    }
}


const deleteEntry = async(req:NextApiRequest, res:NextApiResponse<Data>) => {
    const { id } = req.query;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:'Id no valido'});
    }

    try{
        
        const entryToDelelte = await Entry.findByIdAndDelete(id);
        return res.status(200).json(entryToDelelte!);

    }catch(err){
        console.log(err);
        await db.disconnect();
        return res.status(500).json({message:'Error al eliminar la entrada'});
    }
}