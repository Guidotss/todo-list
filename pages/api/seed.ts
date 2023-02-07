import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../dataBase';
import EntryModel from '../../models/Entry';
import '../../dataBase/db';

type Data = {
    message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === 'production') {
        return res.status(404).json({
            message:'No tiene acceso a este servicio'
        });
    }

    await EntryModel.deleteMany();
    await EntryModel.insertMany(seedData.entries);
    
    
    return res.status(200).json({
        message: 'Proceso realizado con éxito'
    })
}