

interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string;
    status: string; 
    createdAt: number;
}


export const seedData:SeedData ={
    entries:[
        {   
            description:'Pending: Café',
            status:'pending',
            createdAt: Date.now()
        },
        {
            description: 'In-Progress: Leche',
            status:'in-progress',
            createdAt: Date.now() - 100000
        },
        {
            description: 'Finished: Pan',
            status:'finished',
            createdAt: Date.now() - 200000
        },
    ]
}