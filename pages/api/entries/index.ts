import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../dataBase';
import { Entry,IEntry } from '../../../models';
import '../../../dataBase/db';

type Data = 
    |{message:string}
    | IEntry[]
    | IEntry


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':
            return getEntries( res )
        
        case 'POST':
            return createEntry(req,res);
        
        default: 
            return res.status(400).json({message:'Endpoint no existe'}); 
    }
}


const getEntries = async( res:NextApiResponse<Data> ) =>{

    try {
        
        const entries = await Entry.find().sort({createdAt:-1}); 

        return res.status(200).json(entries);


    }catch(err){
        await db.disconnect();
        console.log(err);
        return res.status(500).json({message:'Error al obtener las entradas'});
    }
}


const createEntry = async(req:NextApiRequest,res:NextApiResponse<Data>) => {
    try{
        if(!req.body){
            return res.status(400).json({message:'No hay datos'});
        }

        const { description } = req.body;
        const newEntry = new Entry({
            description,
            createdAt: Date.now()
        });

        await newEntry.save();
        return res.status(201).json(newEntry);
        
    }catch(err){
        await db.disconnect();
        console.log(err);
        return res.status(500).json({message:'Error al crear la entrada'});
    }
}